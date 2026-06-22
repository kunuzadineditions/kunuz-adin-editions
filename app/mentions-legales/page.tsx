import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site KUNUZ ADIN ÉDITIONS.",
};

const SECTIONS = [
  {
    title: "Éditeur du site",
    content: [
      { label: "Raison sociale", value: "KOMBOKOM" },
      { label: "Forme juridique", value: "Entreprise individuelle" },
      { label: "SIRET", value: "94921598200032" },
      { label: "Siège social", value: "Annonay (07100), France" },
      { label: "Marque éditoriale", value: "KUNUZ ADIN ÉDITIONS" },
      { label: "Directeur de publication", value: "Sid’Ahmed K." },
      {
        label: "Contact",
        value: "contact@kunuz-adin-editions.com",
        href: "mailto:contact@kunuz-adin-editions.com",
      },
    ],
  },
  {
    title: "Hébergeur",
    content: [
      { label: "Société", value: "IONOS SE" },
      { label: "Siège social", value: "Elgendorfer Str. 57, 56410 Montabaur, Allemagne" },
      { label: "Site", value: "www.ionos.fr", href: "https://www.ionos.fr" },
    ],
  },
  {
    title: "Propriété intellectuelle",
    prose: [
      "L'ensemble des contenus du site kunuz-adin-editions.com (textes, images, graphismes, logo, icônes) est la propriété exclusive de KUNUZ ADIN ÉDITIONS / KOMBOKOM, sauf mention contraire.",
      "Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable.",
    ],
  },
  {
    title: "Données personnelles",
    prose: [
      "Le site collecte des adresses email dans le cadre de la liste d'attente de lancement. Ces données sont traitées conformément à notre politique de confidentialité et à la réglementation RGPD.",
    ],
    link: { href: "/confidentialite", label: "Consulter la politique de confidentialité" },
  },
  {
    title: "Cookies",
    prose: [
      "Le site n'utilise pas de cookies à des fins publicitaires ou de traçage tiers. Des cookies techniques strictement nécessaires au fonctionnement du site peuvent être déposés.",
    ],
  },
  {
    title: "Limitation de responsabilité",
    prose: [
      "KUNUZ ADIN ÉDITIONS s'efforce d'assurer l'exactitude des informations diffusées sur ce site. Toutefois, nous ne pouvons garantir l'exhaustivité ou l'absence d'erreur de ces informations.",
      "Les liens hypertextes présents sur le site peuvent renvoyer vers des sites tiers. KUNUZ ADIN ÉDITIONS décline toute responsabilité quant aux contenus de ces sites.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gold-dark" />
            <p className="text-xs tracking-[0.3em] text-gold uppercase">Légal</p>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-text font-light mb-4">
            Mentions légales
          </h1>
          <p className="text-text-secondary text-sm">
            Conformément aux articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004
            pour la Confiance dans l&rsquo;Économie Numérique (LCEN).
          </p>
          <div className="h-px w-24 bg-gold-dark mt-8" />
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl text-text font-light mb-5 pb-3 border-b border-border">
                {section.title}
              </h2>

              {/* Key-value table */}
              {"content" in section && section.content && (
                <dl className="flex flex-col gap-3">
                  {section.content.map((row) => (
                    <div key={row.label} className="flex flex-col sm:flex-row sm:gap-6">
                      <dt className="w-52 flex-shrink-0 text-[11px] tracking-[0.2em] text-gold/80 uppercase pt-0.5">
                        {row.label}
                      </dt>
                      <dd className="text-text-secondary text-sm">
                        {"href" in row && row.href ? (
                          <a
                            href={row.href}
                            className="hover:text-gold transition-colors duration-300 underline underline-offset-2"
                          >
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {/* Prose */}
              {"prose" in section && section.prose && (
                <div className="flex flex-col gap-4">
                  {section.prose.map((para, i) => (
                    <p key={i} className="text-text-secondary text-sm leading-relaxed">
                      {para}
                    </p>
                  ))}
                  {"link" in section && section.link && (
                    <Link
                      href={section.link.href}
                      className="text-xs tracking-widest text-gold uppercase hover:text-gold-light transition-colors duration-300 inline-flex items-center gap-2"
                    >
                      {section.link.label} →
                    </Link>
                  )}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Back */}
        <div className="mt-14 pt-8 border-t border-border">
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
