import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Commande confirmée · KUNUZ ADIN Éditions",
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-12 bg-gold-dark" />
          <div className="w-2 h-2 rounded-full bg-gold" />
          <div className="h-px w-12 bg-gold-dark" />
        </div>

        <p
          className="text-4xl text-gold mb-4 leading-none"
          style={{ fontFamily: "var(--font-arabic)" }}
          dir="rtl"
        >
          بارك الله فيك
        </p>

        <h1 className="font-display text-2xl text-text font-light mb-4">
          Commande reçue
        </h1>

        <p className="text-text-secondary leading-relaxed mb-10">
          Jazak Allahu khayran pour ta confiance. Tu recevras un email de
          confirmation sous peu. Que ce livre soit une bénédiction pour toi et
          pour ceux qui t&rsquo;entourent.
        </p>

        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-12 bg-border" />
          <div className="w-1 h-1 rounded-full bg-gold-dark" />
          <div className="h-px w-12 bg-border" />
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-widest text-gold uppercase hover:text-gold-light transition-colors duration-300"
        >
          ← Retour à l&rsquo;accueil
        </Link>
      </div>
    </div>
  );
}
