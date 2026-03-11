import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '../../../../lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover'
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const userId = session.metadata?.userId;
      const credits = parseInt(session.metadata?.credits || '0');
      const amountCents = session.amount_total || 0;

      if (!userId || credits === 0) {
        console.error('Invalid session metadata:', session.metadata);
        return NextResponse.json({ error: 'Invalid metadata' }, { status: 400 });
      }

      try {
        const supabase = await createClient();

        // Call the database function to process credit purchase
        const { data, error } = await supabase.rpc('process_credit_purchase', {
          p_user_id: userId,
          p_credits: credits,
          p_price_cents: amountCents,
          p_stripe_session_id: session.id,
          p_stripe_payment_intent_id: session.payment_intent as string
        });

        if (error) {
          console.error('Failed to process credit purchase:', error);
          return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        console.log('Credit purchase processed:', {
          userId,
          credits,
          transactionId: data
        });
      } catch (error) {
        console.error('Error processing payment:', error);
        return NextResponse.json({ error: 'Processing error' }, { status: 500 });
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.error('Payment failed:', paymentIntent.id);
      // TODO: Notify user about failed payment
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
