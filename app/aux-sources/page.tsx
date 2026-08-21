import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { scholars, buildChain } from "@/lib/scholars";

export const metadata: Metadata = {
  title: "Aux sources de la chaîne du savoir",
  description:
    "Les savants dont s'inspire KUNUZ ADIN Éditions : Ibn Taymiyya et Ibn al-Qayyim al-Jawziyya, leurs parcours, leurs œuvres et leur enseignement sur le cœur.",
};

function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M1 11L11 1M11 1H4M11 1V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AuxSourcesPage() {
  const chain = buildChain(scholars);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* En-tête */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gold-dark" />
            <p className="text-xs tracking-[0.3em] text-gold uppercase">Tradition du savoir</p>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-text font-light leading-tight mb-6">
            Aux sources de la chaîne du savoir
          </h1>
          <div className="space-y-4 text-text-secondary leading-relaxed max-w-2xl">
            <p>
              KUNUZ ADIN Éditions s'inscrit dans la tradition des sciences du cœur, telles
              qu'elles ont été préservées et transmises par les savants du Salaf. De maître à
              élève, de génération en génération, un même corpus de connaissance voyage
              jusqu'à nous.
            </p>
            <p>
              Cette page présente les savants dont le travail inspire directement nos
              publications. Pour chacun : un parcours, des œuvres et des extraits de leur
              enseignement sur le cœur.
            </p>
          </div>
          <div className="h-px w-24 bg-gold-dark mt-8" />
        </div>

        {/* Chaîne de transmission */}
        <div className="mb-20">
          <p className="text-[10px] tracking-[0.3em] text-gold uppercase mb-10 text-center">
            Chaîne de transmission
          </p>
          <div className="flex flex-col items-center">
            {chain.map((scholar, i) => (
              <div key={scholar.slug} className="flex flex-col items-center w-full">
                <Link
                  href={`/aux-sources/${scholar.slug}`}
                  className="border border-gold/30 bg-card px-8 py-5 text-center hover:border-gold/60 hover:bg-gold/5 transition-colors duration-300 w-full max-w-xs"
                >
                  {scholar.title && (
                    <p className="text-[9px] tracking-[0.3em] text-gold-dark uppercase mb-1">
                      {scholar.title}
                    </p>
                  )}
                  <p className="font-display text-xl text-text">{scholar.name}</p>
                  <p
                    className="mt-1"
                    dir="rtl"
                    lang="ar"
                    style={{ fontFamily: "var(--font-amiri)", fontSize: 15, color: "rgba(201,168,76,0.5)" }}
                  >
                    {scholar.nameArabic}
                  </p>
                  <p className="text-[10px] text-text-secondary/50 mt-1 tracking-wider">
                    {scholar.dates}
                  </p>
                </Link>

                {i < chain.length - 1 && (
                  <div className="flex flex-col items-center py-1">
                    <div className="w-px h-5 bg-gold/25" />
                    <p className="text-[8px] tracking-[0.25em] text-gold-dark uppercase py-1.5">
                      son élève le plus renommé
                    </p>
                    <div className="w-px h-5 bg-gold/25" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Séparateur */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-border" />
          <div className="w-1 h-1 rounded-full bg-gold-dark" />
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Grille des cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scholars.map((scholar) => (
            <Link
              key={scholar.slug}
              href={`/aux-sources/${scholar.slug}`}
              className="group border border-border hover:border-gold/30 bg-card transition-colors duration-500 flex flex-col"
            >
              {/* Image */}
              {scholar.image && (
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={scholar.image}
                    alt=""
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <p
                    className="absolute bottom-4 left-0 right-0 text-center pointer-events-none px-4"
                    dir="rtl"
                    lang="ar"
                    style={{
                      fontFamily: "var(--font-amiri)",
                      fontSize: "1.15rem",
                      color: "#C9A84C",
                      textShadow: "0 2px 10px rgba(0,0,0,0.95)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {scholar.nameArabic}
                  </p>
                </div>
              )}

              <div className={`flex flex-col gap-5 p-6 sm:p-8 ${scholar.image ? "flex-1" : ""}`}>
              <div>
                {scholar.title && (
                  <p className="text-[9px] tracking-[0.3em] text-gold uppercase mb-2">
                    {scholar.title}
                  </p>
                )}
                <h2 className="font-display text-2xl text-text group-hover:text-gold transition-colors duration-300 leading-snug">
                  {scholar.name}
                </h2>
                <p className="text-[10px] text-text-secondary/50 mt-1 tracking-wider">
                  {scholar.dates}
                </p>
              </div>

              <div className="h-px bg-border group-hover:bg-gold/20 transition-colors duration-300" />

              <blockquote className="font-display italic text-text-secondary text-base leading-relaxed flex-1">
                <span
                  className="text-gold/25 not-italic"
                  style={{ fontSize: 36, lineHeight: 1 }}
                  aria-hidden
                >
                  &ldquo;
                </span>
                {scholar.featuredQuote.text}
                <span
                  className="text-gold/25 not-italic"
                  style={{ fontSize: 36, lineHeight: 1 }}
                  aria-hidden
                >
                  &rdquo;
                </span>
              </blockquote>

              <p className="text-xs tracking-widest text-gold uppercase flex items-center gap-2">
                Lire la fiche complète
                <ArrowIcon />
              </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
