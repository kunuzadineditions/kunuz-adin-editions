import Stripe from "stripe";

const ALLOWED_PRICES = new Set([
  process.env.STRIPE_PRICE_LIVRE1,
  process.env.STRIPE_PRICE_CARNET,
]);

type LineItem = { priceId: string; quantity: number };

function clampQty(q: unknown): number {
  return Math.min(10, Math.max(1, Math.round(Number(q) || 1)));
}

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl   = process.env.NEXT_PUBLIC_URL;

  if (!secretKey || secretKey.includes("REMPLACE")) {
    return Response.json({ error: "STRIPE_SECRET_KEY non configurée." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);

  // Accept both { items: [...] } (cart) and { priceId, quantity } (legacy single item)
  let lineItems: LineItem[];

  if (Array.isArray(body?.items) && body.items.length > 0) {
    lineItems = body.items.map((i: { priceId: unknown; quantity: unknown }) => ({
      priceId:  String(i.priceId ?? ""),
      quantity: clampQty(i.quantity),
    }));
  } else if (body?.priceId) {
    lineItems = [{ priceId: String(body.priceId), quantity: clampQty(body.quantity) }];
  } else {
    return Response.json({ error: "Aucun article fourni." }, { status: 400 });
  }

  // Validate every price ID against the allow-list
  const invalid = lineItems.find((i) => !ALLOWED_PRICES.has(i.priceId));
  if (invalid) {
    return Response.json({ error: `Price ID invalide : ${invalid.priceId}` }, { status: 400 });
  }

  const stripe  = new Stripe(secretKey);
  const session = await stripe.checkout.sessions.create({
    mode:   "payment",
    locale: "fr",
    line_items: lineItems.map((i) => ({ price: i.priceId, quantity: i.quantity })),
    shipping_options: [
      { shipping_rate: "shr_1TiaLwHsvBneNqFikoyuvsqV" },
      { shipping_rate: "shr_1TiaNzHsvBneNqFil7RRMZeC" },
      { shipping_rate: "shr_1TiaPIHsvBneNqFi4w8p2zh2" },
    ],
    shipping_address_collection: {
      allowed_countries: ["FR", "BE", "CH", "LU", "MA", "TN", "DZ", "SN", "CI"],
    },
    customer_creation: "if_required",
    automatic_tax:     { enabled: true },
    payment_method_types: ["card"],
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${baseUrl}/boutique`,
  });

  return Response.json({ url: session.url });
}
