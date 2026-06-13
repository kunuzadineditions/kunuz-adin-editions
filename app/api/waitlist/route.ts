export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;

  if (!apiKey || !listId) {
    return Response.json(
      { error: "Configuration serveur manquante : BREVO_API_KEY ou BREVO_LIST_ID non défini." },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: [Number(listId)],
      updateEnabled: true,
    }),
  });

  if (res.status === 201) {
    return Response.json({ message: "registered" }, { status: 201 });
  }

  if (res.status === 204) {
    return Response.json({ message: "already_registered" }, { status: 200 });
  }

  const error = await res.json().catch(() => ({}));
  return Response.json(
    { error: error?.message ?? "Erreur Brevo inattendue.", code: error?.code },
    { status: 502 }
  );
}
