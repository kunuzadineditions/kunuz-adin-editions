import type { Metadata } from "next";
import TemoignageForm from "./TemoignageForm";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Livre d'or",
  description: "Les témoignages de lecteurs de KUNUZ ADIN Éditions.",
};

export default async function LivreDorPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">

        {/* En-tête */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gold-dark" />
            <p className="text-xs tracking-[0.3em] text-gold uppercase">Livre d'or</p>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-text font-light mb-4">
            Livre d'or
          </h1>
          <p className="text-text-secondary leading-relaxed max-w-lg">
            [Texte d'introduction — à renseigner]
          </p>
          <div className="h-px w-24 bg-gold-dark mt-8" />
        </div>

        {/* Zone d'affichage des témoignages — habillage "livre ancien" à venir */}
        <div className="mb-24 border border-border flex items-center justify-center py-24">
          <p className="text-text-secondary/30 text-sm italic">
            Affichage des témoignages — à venir
          </p>
        </div>

        {/* Séparateur */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-border" />
          <div className="w-1 h-1 rounded-full bg-gold-dark" />
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Formulaire */}
        <div>
          <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4">
            Votre témoignage
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-text font-light mb-8">
            Partagez ce que cette lecture vous a apporté
          </h2>
          <TemoignageForm />
        </div>

      </div>
    </div>
  );
}
