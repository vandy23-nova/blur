import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';

const creditCosts = {
  easy: 3,
  medium: 5,
  hard: 10
};

export async function POST(request: NextRequest) {
  try {
    const { blurId, method } = await request.json();

    if (!blurId || !method) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Get blur details
    const { data: blur, error: blurError } = await supabase
      .from('blurs')
      .select('*')
      .eq('id', blurId)
      .single();

    if (blurError || !blur) {
      return NextResponse.json(
        { error: 'Blur not found' },
        { status: 404 }
      );
    }

    // Check if already unlocked
    if (blur.unlocked) {
      return NextResponse.json(
        { error: 'Blur already unlocked' },
        { status: 400 }
      );
    }

    // Check if user is the receiver
    if (blur.receiver_id !== user.id) {
      return NextResponse.json(
        { error: 'Not authorized to unlock this blur' },
        { status: 403 }
      );
    }

    if (method === 'credits') {
      // Get credit cost based on difficulty
      const cost = creditCosts[blur.difficulty as keyof typeof creditCosts] || 5;

      // Check user's credit balance
      const { data: userCredits, error: creditsError } = await supabase
        .from('user_credits')
        .select('balance')
        .eq('user_id', user.id)
        .single();

      if (creditsError || !userCredits || userCredits.balance < cost) {
        return NextResponse.json(
          { error: 'Insufficient credits' },
          { status: 400 }
        );
      }

      // Use the database function to spend credits and unlock
      const { data: success, error: unlockError } = await supabase
        .rpc('spend_credits_to_unlock', {
          p_user_id: user.id,
          p_blur_id: blurId,
          p_credits: cost
        });

      if (unlockError || !success) {
        console.error('Failed to unlock blur:', unlockError);
        return NextResponse.json(
          { error: 'Failed to unlock blur' },
          { status: 500 }
        );
      }

      // Get updated blur with sender info
      const { data: unlockedBlur, error: fetchError } = await supabase
        .from('blurs')
        .select(`
          *,
          sender:users!sender_id(username, avatar_url)
        `)
        .eq('id', blurId)
        .single();

      if (fetchError) {
        console.error('Failed to fetch unlocked blur:', fetchError);
      }

      return NextResponse.json({
        success: true,
        blur: unlockedBlur || blur,
        creditsSpent: cost
      });
    } else if (method === 'invite') {
      // TODO: Implement invite-based unlocking
      // Check if user has invited 3 friends who signed up
      // If yes, unlock for free
      return NextResponse.json(
        { error: 'Invite unlock not yet implemented' },
        { status: 501 }
      );
    } else {
      return NextResponse.json(
        { error: 'Invalid unlock method' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Unlock error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to unlock blur' },
      { status: 500 }
    );
  }
}
