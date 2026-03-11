import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Lazy Stripe initialization to prevent build-time errors
function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error('STRIPE_SECRET_KEY not configured');
  }
  return new Stripe(apiKey, {
    apiVersion: '2026-02-25.clover'
  });
}

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Payment system not configured. Please contact support.' },
        { status: 503 }
      );
    }

    const stripe = getStripe();
    const { priceId, credits, price } = await request.json();

    // TODO: Get actual user ID from session
    const userId = 'temp_user_id';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${credits} Blur Credits`,
              description: 'Credits to unlock mysterious messages on Blur',
              images: ['https://your-domain.com/credits-icon.png'], // TODO: Update with real image
            },
            unit_amount: Math.round(price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/credits/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/credits`,
      metadata: {
        userId,
        credits: credits.toString(),
        priceId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
