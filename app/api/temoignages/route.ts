import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  // Honeypot : un bot remplit ce champ, un humain ne le voit pas
  if (body?.website) {
    return Response.json({ ok: true }, { status: 201 });
  }

  const nom     = typeof body?.nom     === "string" ? body.nom.trim()     : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!nom || nom.length > 80) {
    return Response.json({ error: "Prénom invalide (80 caractères max)." }, { status: 400 });
  }
  if (!message || message.length < 10 || message.length > 1500) {
    return Response.json({ error: "Message invalide (10 à 1500 caractères)." }, { status: 400 });
  }

  // Anti-spam : max 3 soumissions avec le même nom dans les 24 h
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count } = await supabaseAdmin
    .from("temoignages")
    .select("id", { count: "exact", head: true })
    .eq("nom", nom)
    .gte("created_at", since);

  if ((count ?? 0) >= 3) {
    return Response.json({ error: "Trop de soumissions récentes. Réessayez demain." }, { status: 429 });
  }

  const { error } = await supabaseAdmin
    .from("temoignages")
    .insert({ nom, message, statut: "en_attente" });

  if (error) {
    console.error("[temoignages] Supabase error:", error.message);
    return Response.json({ error: "Erreur serveur. Réessayez dans un instant." }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
