import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: 'price_1Tl6gBHsvBneNqFisuZU8c7u',
        quantity: 1,
      },
    ],
    shipping_address_collection: {
      allowed_countries: [
        'FR','BE','CH','LU','MC','DE','ES','IT','NL','PT',
        'AT','SE','DK','NO','FI','PL','GB','US','CA','MA',
        'DZ','TN','SN','CI','CM','MG','MU','GA','BJ',
      ],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'eur' },
          display_name: '🇫🇷 France : Livraison offerte',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 3 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 790, currency: 'eur' },
          display_name: '🇪🇺 Europe : 7,90€',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 5 },
            maximum: { unit: 'business_day', value: 10 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 1290, currency: 'eur' },
          display_name: '🌍 International : 12,90€',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 7 },
            maximum: { unit: 'business_day', value: 21 },
          },
        },
      },
    ],
    payment_method_types: ['card'],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?fondateur=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/fondateur`,
    metadata: { type: 'pack_fondateur' },
  });

  return NextResponse.json({ url: session.url });
}
