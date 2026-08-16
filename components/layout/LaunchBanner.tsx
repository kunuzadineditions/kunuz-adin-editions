"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { PACK_SWITCH_TIMESTAMP } from "@/lib/pack-price";

export default function LaunchBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Évalué dans le navigateur au moment de la visite — fiable sur toutes les pages,
    // qu'elles soient statiques, ISR ou SSR.
    setShow(Date.now() < PACK_SWITCH_TIMESTAMP * 1000);
  }, []);

  if (!show) return null;

  return (
    <div className="bg-gold/10 border-b border-gold/25 py-2.5 px-4">
      <p className="text-center font-display text-sm sm:text-base leading-snug">
        <span className="text-text-secondary">
          {"Offre de lancement. Pack Fondateur à "}
        </span>
        <span className="text-gold">30 €</span>
        <span className="text-text-secondary">
          {" jusqu'au 18 septembre. Ensuite, 39 €. "}
        </span>
        <Link
          href="/livres/pack-livre-carnet"
          className="text-gold underline underline-offset-2 decoration-gold/40 hover:text-gold-light hover:decoration-gold-light transition-colors duration-200 whitespace-nowrap"
        >
          Voir l'offre
        </Link>
      </p>
    </div>
  );
}
