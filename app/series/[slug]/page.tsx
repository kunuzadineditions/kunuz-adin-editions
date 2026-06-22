import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { seriesMeta, getSeriesBySlug, getBooksBySeries } from "@/lib/books";

export function generateStaticParams() {
  return seriesMeta.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/series/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const s = getSeriesBySlug(slug);
  if (!s) return {};
  return {
    title: `Série ${s.label}`,
    description: s.tagline,
  };
}

export default async function SeriesPage(props: PageProps<"/series/[slug]">) {
  const { slug } = await props.params;
  const s = getSeriesBySlug(slug);
  if (!s) notFound();

  const seriesBooks = getBooksBySeries(slug);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-text-secondary mb-14 tracking-widest uppercase">
          <Link href="/" className="hover:text-gold transition-colors duration-300">
            Accueil
          </Link>
          <span className="text-border">／</span>
          <span className="text-text-secondary/60">Série {s.label}</span>
        </nav>

        {/* Hero */}
        <div className="mb-20">
          <p className="text-xs tracking-[0.3em] text-gold uppercase mb-6">
            Collection
          </p>

          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-text font-light leading-none">
              {s.label}
            </h1>
            <p
              className="font-arabic text-3xl sm:text-4xl text-gold-dark leading-none sm:pb-1"
              dir="rtl"
              lang="ar"
            >
              {s.arabic}
            </p>
          </div>

          <p className="font-display text-xl text-text-secondary italic font-light max-w-xl mb-3">
            {s.tagline}
          </p>
          <p className="text-xs tracking-[0.2em] text-gold-dark uppercase">
            {s.theme}
          </p>

          <div className="h-px w-24 bg-gold-dark mt-10" />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-14 lg:gap-16 items-start">

          {/* Books */}
          <div>
            <h2 className="font-display text-2xl text-text font-light mb-8">
              Titres de la série
              <span className="text-text-secondary/50 text-lg ml-3">
                ({seriesBooks.length})
              </span>
            </h2>

            <div className="flex flex-col gap-5">
              {seriesBooks.map((book, i) => (
                <Link
                  key={book.slug}
                  href={`/livres/${book.slug}`}
                  className="group flex gap-6 border border-border hover:border-gold-dark transition-colors duration-500 p-5 sm:p-6"
                >
                  {/* Mini cover */}
                  <div
                    className="relative flex-shrink-0 w-20 sm:w-24 aspect-[3/4] overflow-hidden flex flex-col items-center justify-center text-center p-2"
                    style={{
                      backgroundColor: book.coverColor,
                      boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.12)",
                    }}
                  >
                    {book.coverImage ? (
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <>
                        <div className="h-px w-4 bg-gold mb-2" />
                        <p
                          className="font-display text-gold text-[10px] leading-snug"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {book.title}
                        </p>
                        <div className="h-px w-4 bg-gold mt-2" />
                      </>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-display text-lg text-gold leading-none">
                          {book.price}
                        </span>
                      </div>
                      <h3 className="font-display text-lg sm:text-xl text-text group-hover:text-gold transition-colors duration-300 leading-snug mb-1">
                        {book.title}
                      </h3>
                      {book.companion && (
                        <p className="text-[10px] tracking-[0.15em] text-gold-dark italic mb-3">
                          Compagnon du livre <span className="not-italic">{book.companion}</span>
                        </p>
                      )}
                      <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                        {book.summaryShort}
                      </p>
                    </div>
                    <p className="text-xs tracking-widest text-text-secondary/50 group-hover:text-gold transition-colors duration-300 uppercase mt-4">
                      Voir le livre →
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <p className="text-text-secondary/50 text-xs tracking-wide italic mt-6">
              D&rsquo;autres titres rejoindront la collection, in sha Allah.
            </p>
          </div>

          {/* Sidebar — about the series */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-8">

            {/* Description */}
            <div className="border border-border p-6">
              <p className="text-[10px] tracking-[0.25em] text-gold uppercase mb-5">
                À propos de la série
              </p>
              <div className="space-y-4 text-text-secondary text-sm leading-relaxed">
                {s.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Arabic motif */}
            <div
              className="flex flex-col items-center justify-center py-10 px-6 border border-border/50"
              style={{
                background:
                  "linear-gradient(160deg, #161410 0%, #0C0C0C 100%)",
              }}
            >
              <div className="h-px w-10 bg-gold-dark mb-6" />
              <p
                className="font-arabic text-4xl text-gold text-center leading-relaxed"
                dir="rtl"
                lang="ar"
              >
                {s.arabic}
              </p>
              <p className="text-[10px] tracking-[0.3em] text-text-secondary uppercase mt-4">
                {s.label}
              </p>
              <div className="h-px w-10 bg-gold-dark mt-6" />
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3">
              <Link
                href="/livres"
                className="inline-flex items-center justify-center gap-2 border border-border text-text-secondary text-xs tracking-widest uppercase px-6 py-3.5 hover:border-gold-dark hover:text-gold transition-colors duration-300"
              >
                Tout le catalogue
              </Link>
              <Link
                href="/auteur"
                className="inline-flex items-center justify-center gap-2 border border-gold text-gold text-xs tracking-widest uppercase px-6 py-3.5 hover:bg-gold/10 transition-colors duration-300"
              >
                L&rsquo;auteur →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
