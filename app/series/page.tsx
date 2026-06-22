import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { seriesMeta, getBooksBySeries } from "@/lib/books";

export const metadata: Metadata = {
  title: "Séries",
  description:
    "Les collections de KUNUZ ADIN Éditions, des séries thématiques ancrées dans la tradition islamique francophone.",
};

export default function SeriesListPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gold-dark" />
            <p className="text-xs tracking-[0.3em] text-gold uppercase">Collections</p>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-text font-light mb-4">
            Nos séries
          </h1>
          <p className="text-text-secondary max-w-lg leading-relaxed">
            Chaque série est une exploration cohérente d&rsquo;un territoire de la foi. Des livres conçus pour se compléter et s&rsquo;accompagner.
          </p>
          <div className="h-px w-24 bg-gold-dark mt-8" />
        </div>

        {/* Series list */}
        <div className="flex flex-col gap-20">
          {seriesMeta.map((s) => {
            const seriesBooks = getBooksBySeries(s.slug);
            return (
              <div key={s.slug}>
                {/* Series header */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-3">
                  <h2 className="font-display text-4xl sm:text-5xl text-text font-light leading-none">
                    {s.label}
                  </h2>
                  <p
                    className="font-arabic text-2xl sm:text-3xl text-gold-dark leading-none sm:pb-1"
                    dir="rtl"
                    lang="ar"
                  >
                    {s.arabic}
                  </p>
                </div>
                <p className="text-xs tracking-[0.2em] text-gold-dark uppercase mb-4">
                  {s.theme}
                </p>
                <p className="font-display text-lg text-text-secondary italic font-light max-w-xl mb-8">
                  {s.tagline}
                </p>

                {/* Description */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
                  <div className="space-y-4 text-text-secondary text-sm leading-relaxed">
                    {s.description.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* Arabic motif card */}
                  <div
                    className="flex flex-col items-center justify-center py-10 px-6 border border-border/50"
                    style={{ background: "linear-gradient(160deg, #161410 0%, #0C0C0C 100%)" }}
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
                </div>

                {/* Books in series */}
                {seriesBooks.length > 0 && (
                  <div className="mt-10">
                    <p className="text-[10px] tracking-[0.25em] text-gold uppercase mb-5">
                      Titres de la série ({seriesBooks.length})
                    </p>
                    <div className="flex flex-col gap-4">
                      {seriesBooks.map((book, i) => (
                        <Link
                          key={book.slug}
                          href={`/livres/${book.slug}`}
                          className="group flex gap-5 border border-border hover:border-gold-dark transition-colors duration-500 p-5"
                        >
                          <div
                            className="relative flex-shrink-0 w-16 aspect-[3/4] overflow-hidden flex flex-col items-center justify-center text-center p-2"
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
                                sizes="64px"
                              />
                            ) : (
                              <>
                                <div className="h-px w-3 bg-gold mb-1.5" />
                                <p
                                  className="font-display text-gold text-[9px] leading-snug"
                                  style={{ fontFamily: "var(--font-display)" }}
                                >
                                  {book.title}
                                </p>
                                <div className="h-px w-3 bg-gold mt-1.5" />
                              </>
                            )}
                          </div>
                          <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
                            <div>
                              <h3 className="font-display text-lg text-text group-hover:text-gold transition-colors duration-300 leading-snug mb-1">
                                {book.title}
                              </h3>
                              {book.companion && (
                                <p className="text-[10px] tracking-[0.15em] text-gold-dark italic mb-2">
                                  Compagnon du livre <span className="not-italic">{book.companion}</span>
                                </p>
                              )}
                              <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                                {book.summaryShort}
                              </p>
                            </div>
                            <p className="text-xs tracking-widest text-text-secondary/50 group-hover:text-gold transition-colors duration-300 uppercase mt-3">
                              Voir le livre →
                            </p>
                          </div>
                          <span className="font-display text-xl text-gold self-start pt-0.5 flex-shrink-0">
                            {book.price}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <p className="text-text-secondary/50 text-xs tracking-wide italic mt-5">
                      D&rsquo;autres titres rejoindront la collection, in sha Allah.
                    </p>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/series/${s.slug}`}
                    className="inline-flex items-center justify-center gap-2 bg-gold text-bg text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-gold-light transition-colors duration-300"
                  >
                    Explorer la série →
                  </Link>
                  <Link
                    href="/livres"
                    className="inline-flex items-center justify-center gap-2 border border-border text-text-secondary text-xs tracking-widest uppercase px-8 py-3.5 hover:border-gold-dark hover:text-gold transition-colors duration-300"
                  >
                    Tout le catalogue
                  </Link>
                </div>

                <div className="h-px w-full bg-border mt-20" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
