import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { amount_cents } = await request.json();

    if (!amount_cents || amount_cents < 1000) {
      return NextResponse.json(
        { error: 'Minimum payout is $10.00' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check available balance
    const { data: earnings, error: earningsError } = await supabase
      .rpc('get_available_earnings', { p_user_id: user.id });

    if (earningsError) {
      console.error('Failed to get earnings:', earningsError);
      return NextResponse.json(
        { error: 'Failed to check balance' },
        { status: 500 }
      );
    }

    if (earnings < amount_cents) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      );
    }

    // Create payout request
    const { data: payout, error: payoutError } = await supabase
      .from('payouts')
      .insert({
        user_id: user.id,
        amount_cents,
        status: 'pending',
        payment_method: 'stripe', // Default to Stripe
        requested_at: new Date().toISOString()
      })
      .select()
      .single();

    if (payoutError) {
      console.error('Failed to create payout:', payoutError);
      return NextResponse.json(
        { error: 'Failed to create payout request' },
        { status: 500 }
      );
    }

    // Mark earnings as paid_out
    const { error: updateError } = await supabase
      .from('earnings')
      .update({ status: 'paid_out' })
      .eq('creator_id', user.id)
      .eq('status', 'available');

    if (updateError) {
      console.error('Failed to update earnings:', updateError);
      // Don't fail the request, payout was created
    }

    // TODO: In production, integrate with Stripe Connect or similar
    // to actually transfer money to the user's account

    return NextResponse.json({
      success: true,
      payout
    });
  } catch (error: any) {
    console.error('Payout request error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process payout request' },
      { status: 500 }
    );
  }
}
