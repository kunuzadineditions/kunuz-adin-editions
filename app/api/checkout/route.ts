import Stripe from "stripe";

const ALLOWED_PRICES = new Set([
  process.env.STRIPE_PRICE_LIVRE1,
  process.env.STRIPE_PRICE_CARNET,
]);

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl   = process.env.NEXT_PUBLIC_URL;

  if (!secretKey || secretKey.startsWith("sk_test_REMPLACE")) {
    return Response.json(
      { error: "STRIPE_SECRET_KEY non configurée." },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const { priceId, quantity = 1 } = body ?? {};

  if (!priceId || !ALLOWED_PRICES.has(priceId)) {
    return Response.json({ error: "Price ID invalide." }, { status: 400 });
  }

  const stripe = new Stripe(secretKey);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "fr",
    line_items: [{ price: priceId, quantity }],
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${baseUrl}/boutique`,
    shipping_address_collection: {
      allowed_countries: ["FR", "BE", "CH", "LU", "MA", "TN", "DZ", "SN", "CI"],
    },
    payment_method_types: ["card"],
  });

  return Response.json({ url: session.url });
}
