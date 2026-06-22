import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez KUNUZ ADIN ÉDITIONS pour vos questions, commandes groupées et partenariats.",
};

const TOPICS = [
  {
    label: "Commandes & livraison",
    detail: "Questions sur une commande, suivi de colis, retours.",
  },
  {
    label: "Commandes groupées",
    detail: "Bibliothèques, mosquées, associations : tarifs adaptés disponibles.",
    link: { href: "/boutique", label: "Voir la page boutique" },
  },
  {
    label: "Droits & partenariats",
    detail: "Librairies, distributeurs, traductions, collaborations éditoriales.",
  },
  {
    label: "Presse & médias",
    detail: "Demandes de services de presse, interviews, mentions.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gold-dark" />
            <p className="text-xs tracking-[0.3em] text-gold uppercase">Contact</p>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-text font-light mb-4">
            Nous contacter
          </h1>
          <p className="text-text-secondary leading-relaxed max-w-lg">
            Pour toute demande, écrivez-nous directement à l&rsquo;adresse ci-dessous.
            Nous répondons dans un délai de 2 à 4 jours ouvrés.
          </p>
          <div className="h-px w-24 bg-gold-dark mt-8" />
        </div>

        {/* Email CTA */}
        <div className="border border-border p-8 sm:p-10 mb-14">
          <p className="text-[10px] tracking-[0.3em] text-gold uppercase mb-3">
            Adresse email
          </p>
          <a
            href="mailto:contact@kunuz-adin-editions.com"
            className="font-display text-2xl sm:text-3xl text-text hover:text-gold transition-colors duration-300 block mb-1"
          >
            contact@kunuz-adin-editions.com
          </a>
          <p className="text-text-secondary/60 text-sm">
            KUNUZ ADIN ÉDITIONS, Annonay (07), France
          </p>
        </div>

        {/* Topics */}
        <div className="mb-14">
          <p className="text-xs tracking-[0.25em] text-gold uppercase mb-6">
            Pour nous écrire à propos de…
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            {TOPICS.map((topic) => (
              <div key={topic.label} className="bg-bg p-6 flex flex-col gap-2">
                <p className="text-sm text-text font-medium">{topic.label}</p>
                <p className="text-text-secondary/70 text-xs leading-relaxed">
                  {topic.detail}
                </p>
                {topic.link && (
                  <Link
                    href={topic.link.href}
                    className="text-[11px] tracking-widest text-gold uppercase hover:text-gold-light transition-colors duration-300 mt-1"
                  >
                    {topic.link.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Ornament */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-border" />
          <div className="w-1 h-1 rounded-full bg-gold-dark" />
          <div className="h-px flex-1 bg-border" />
        </div>

        <p className="text-text-secondary/50 text-xs leading-relaxed text-center">
          KUNUZ ADIN ÉDITIONS est une marque éditoriale de KOMBOKOM (SIRET 94921598200032).
        </p>

        {/* Back */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/"
            className="text-xs tracking-widest text-text-secondary hover:text-gold uppercase transition-colors duration-300 inline-flex items-center gap-2"
          >
            ← Retour à l&rsquo;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
