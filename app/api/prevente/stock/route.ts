import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("v_stock_prevente")
    .select("places_livre_restantes, places_carnet_restantes")
    .single();

  if (error) {
    return NextResponse.json(
      { places_livre_restantes: 100, places_carnet_restantes: 100 },
      { status: 200 }
    );
  }

  return NextResponse.json({
    places_livre_restantes: data?.places_livre_restantes ?? 100,
    places_carnet_restantes: data?.places_carnet_restantes ?? 100,
  });
}
