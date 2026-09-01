import Stripe from "stripe";

export async function POST(request: Request) {
  const secretKey     = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret || webhookSecret === "whsec_PLUS_TARD") {
    return Response.json({ received: true });
  }

  const body = await request.text();
  const sig  = request.headers.get("stripe-signature") ?? "";

  const stripe = new Stripe(secretKey);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return Response.json({ error: "Webhook signature invalide." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("[stripe] commande confirmée:", session.id);
    // TODO: envoyer un email de confirmation via Brevo
  }

  return Response.json({ received: true });
}
