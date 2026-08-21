import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { scholars, getScholarBySlug } from "@/lib/scholars";

export function generateStaticParams() {
  return scholars.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const scholar = getScholarBySlug(slug);
  if (!scholar) return {};
  return {
    title: `${scholar.name} ${scholar.nameArabic}`,
    description: `Parcours, œuvres et citations de ${scholar.name}, savant de l'islam classique dont s'inspire KUNUZ ADIN Éditions.`,
  };
}

export default async function ScholarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scholar = getScholarBySlug(slug);
  if (!scholar) notFound();

  const teacher = scholar.teacherSlug ? getScholarBySlug(scholar.teacherSlug) : null;

  return (
    <div className="min-h-screen">
      {/* Image d'en-tête */}
      {scholar.image && (
        <div className="relative w-full aspect-[21/9] sm:aspect-[21/7] overflow-hidden">
          <Image
            src={scholar.image}
            alt=""
            fill
            className="object-cover opacity-70"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/20 to-bg" />
          <p
            className="absolute bottom-6 sm:bottom-10 left-0 right-0 text-center pointer-events-none px-4"
            dir="rtl"
            lang="ar"
            style={{
              fontFamily: "var(--font-amiri)",
              fontSize: "clamp(1.25rem, 3vw, 2rem)",
              color: "#C9A84C",
              textShadow: "0 2px 16px rgba(0,0,0,0.95)",
              letterSpacing: "0.02em",
            }}
          >
            {scholar.nameArabic}
          </p>
        </div>
      )}

      <div className={`max-w-3xl mx-auto px-4 ${scholar.image ? "pt-8 pb-20" : "py-20"}`}>

        {/* Fil d'Ariane */}
        <nav
          className="flex items-center gap-2 text-xs text-text-secondary mb-12 tracking-widest uppercase"
          aria-label="Fil d'Ariane"
        >
          <Link href="/" className="hover:text-gold transition-colors duration-300">
            Accueil
          </Link>
          <span className="text-border">／</span>
          <Link href="/aux-sources" className="hover:text-gold transition-colors duration-300">
            Aux sources
          </Link>
          <span className="text-border">／</span>
          <span className="text-text-secondary/60 truncate max-w-[200px]">{scholar.name}</span>
        </nav>

        {/* En-tête */}
        <div className="mb-12">
          {scholar.title && (
            <p className="text-xs tracking-[0.3em] text-gold uppercase mb-3">
              {scholar.title}
            </p>
          )}
          <h1 className="font-display text-4xl sm:text-5xl text-text font-light leading-tight mb-3">
            {scholar.name}
          </h1>
          <p
            dir="rtl"
            lang="ar"
            style={{
              fontFamily: "var(--font-amiri)",
              fontSize: 22,
              color: "rgba(201,168,76,0.65)",
            }}
          >
            {scholar.nameArabic}
          </p>
          {scholar.nameExplained && (
            <p className="text-text-secondary/50 text-sm italic mt-2">
              {scholar.nameExplained}
            </p>
          )}
          <div className="h-px w-16 bg-gold-dark mt-6" />
        </div>

        {/* Grille d'identité */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border border-border p-6 mb-12">
          <div>
            <p className="text-[9px] tracking-[0.3em] text-gold uppercase mb-1">Nom complet</p>
            <p className="text-text-secondary text-sm leading-relaxed">{scholar.fullName}</p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.3em] text-gold uppercase mb-1">Dates</p>
            <p className="text-text-secondary text-sm">{scholar.dates}</p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.3em] text-gold uppercase mb-1">Naissance</p>
            <p className="text-text-secondary text-sm">{scholar.birth}</p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.3em] text-gold uppercase mb-1">Décès</p>
            <p className="text-text-secondary text-sm">{scholar.death}</p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.3em] text-gold uppercase mb-1">École juridique</p>
            <p className="text-text-secondary text-sm">{scholar.school}</p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.3em] text-gold uppercase mb-1">Voie</p>
            <p className="text-text-secondary text-sm">{scholar.way}</p>
          </div>
        </div>

        {/* Maître (chaîne de transmission) */}
        {teacher && (
          <div className="mb-12 pl-5 border-l-2 border-gold/30">
            <p className="text-[9px] tracking-[0.3em] text-gold-dark uppercase mb-2">Maître</p>
            <Link
              href={`/aux-sources/${teacher.slug}`}
              className="font-display text-lg text-text hover:text-gold transition-colors duration-300"
            >
              {teacher.name}
              {teacher.title && (
                <span className="text-text-secondary/50 text-base font-normal">
                  {", "}{teacher.title}
                </span>
              )}
            </Link>
            <p className="text-text-secondary/50 text-xs mt-0.5">{teacher.dates}</p>
          </div>
        )}

        {/* Parcours */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <p className="text-[10px] tracking-[0.25em] text-gold uppercase whitespace-nowrap">
              Parcours
            </p>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            {scholar.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* Connu pour */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <p className="text-[10px] tracking-[0.25em] text-gold uppercase whitespace-nowrap">
              Il est connu pour
            </p>
            <div className="h-px flex-1 bg-border" />
          </div>
          <ul className="space-y-3">
            {scholar.knownFor.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-text-secondary">
                <span className="text-gold-dark mt-0.5 text-xs flex-shrink-0" aria-hidden>
                  ✦
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Élèves illustres */}
        {scholar.students && scholar.students.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <p className="text-[10px] tracking-[0.25em] text-gold uppercase whitespace-nowrap">
                Élèves illustres
              </p>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="flex flex-wrap gap-2">
              {scholar.students.map((name, i) => {
                const linked = scholars.find((s) => s.name === name);
                return linked ? (
                  <Link
                    key={i}
                    href={`/aux-sources/${linked.slug}`}
                    className="text-xs border border-gold/30 px-3 py-1.5 text-gold hover:border-gold hover:bg-gold/5 transition-colors duration-200"
                  >
                    {name}
                  </Link>
                ) : (
                  <span
                    key={i}
                    className="text-xs border border-border px-3 py-1.5 text-text-secondary/60"
                  >
                    {name}
                  </span>
                );
              })}
            </div>
          </section>
        )}

        {/* Œuvres majeures */}
        {scholar.majorWorks && scholar.majorWorks.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <p className="text-[10px] tracking-[0.25em] text-gold uppercase whitespace-nowrap">
                Œuvres majeures sur les sciences du cœur
              </p>
              <div className="h-px flex-1 bg-border" />
            </div>
            <ul className="space-y-2">
              {scholar.majorWorks.map((work, i) => (
                <li key={i} className="font-display italic text-text-secondary leading-relaxed">
                  {work}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Note éditoriale */}
        {scholar.editorialNote && (
          <div className="mb-12 border border-gold/30 bg-gold/5 px-6 py-5">
            <p className="font-display italic text-base text-text-secondary leading-relaxed">
              {scholar.editorialNote}
            </p>
            <Link
              href="/livres/tu-pries-mais-tu-ne-tapaises-pas"
              className="inline-block mt-3 text-[10px] tracking-[0.25em] text-gold hover:text-gold-light uppercase transition-colors duration-200"
            >
              Découvrir le livre
            </Link>
          </div>
        )}

        {/* Citations */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <p className="text-[10px] tracking-[0.25em] text-gold uppercase whitespace-nowrap">
              Citations
            </p>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="space-y-10">
            {scholar.quotes.map((quote, i) => (
              <div key={i} className="border-l-2 border-gold/30 pl-6">
                {quote.label && (
                  <p className="text-[9px] tracking-[0.3em] text-gold-dark uppercase mb-4">
                    {quote.label}
                  </p>
                )}
                <blockquote className="font-display italic text-lg text-text leading-relaxed mb-3">
                  &ldquo;{quote.text}&rdquo;
                </blockquote>
                <p className="text-xs text-text-secondary/50 leading-relaxed">{quote.source}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Retour */}
        <Link
          href="/aux-sources"
          className="text-xs tracking-widest text-text-secondary hover:text-gold uppercase transition-colors duration-300 inline-flex items-center gap-2"
        >
          ← Retour aux sources
        </Link>

      </div>
    </div>
  );

}
