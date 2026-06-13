import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books, getBookBySlug } from "@/lib/books";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata(
  props: PageProps<"/livres/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const book = getBookBySlug(slug);
  if (!book) return {};
  return {
    title: book.title,
    description: book.summaryShort,
  };
}

function PurchaseIcon({ icon }: { icon: "book" | "kindle" | "audio" }) {
  if (icon === "book")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  if (icon === "kindle")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <polygon points="10,8 16,12 10,16" fill="currentColor" />
    </svg>
  );
}

export default async function BookPage(props: PageProps<"/livres/[slug]">) {
  const { slug } = await props.params;
  const book = getBookBySlug(slug);

  if (!book) notFound();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-text-secondary mb-12 tracking-widest uppercase">
          <Link href="/" className="hover:text-gold transition-colors duration-300">
            Accueil
          </Link>
          <span className="text-border">／</span>
          <Link href="/livres" className="hover:text-gold transition-colors duration-300">
            Livres
          </Link>
          <span className="text-border">／</span>
          <span className="text-text-secondary/60 truncate max-w-[160px]">{book.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-start">
          {/* Cover column */}
          <div className="lg:sticky lg:top-28 flex flex-col items-center lg:items-start gap-6">
            {/* Cover */}
            <div
              className="w-52 lg:w-full max-w-[280px] aspect-[3/4] flex flex-col items-center justify-center text-center p-8"
              style={{
                backgroundColor: book.coverColor,
                boxShadow:
                  "inset 0 0 0 1px rgba(201,168,76,0.15), 8px 12px 40px rgba(0,0,0,0.7)",
              }}
            >
              {book.seriesLabel && (
                <p className="text-[10px] tracking-[0.3em] text-gold-dark uppercase mb-5">
                  {book.seriesLabel}
                </p>
              )}
              <div className="h-px w-10 bg-gold mb-5" />
              <p
                className="font-display text-gold text-lg leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {book.title}
              </p>
              <div className="h-px w-10 bg-gold mt-5" />
              <p className="text-[10px] tracking-widest text-gold-dark uppercase mt-5">
                KUNUZ ADIN
              </p>
            </div>

            {/* Purchase links */}
            <div className="w-full max-w-[280px] flex flex-col gap-3">
              {book.purchaseLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-4 py-3 border transition-colors duration-300 group ${
                    link.icon === "book"
                      ? "bg-gold border-gold hover:bg-gold-light text-bg"
                      : "border-border hover:border-gold-dark text-text-secondary hover:text-gold"
                  }`}
                >
                  <PurchaseIcon icon={link.icon} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-none">{link.label}</span>
                    <span className="text-[10px] tracking-widest uppercase opacity-70 mt-0.5">
                      {link.sublabel}
                    </span>
                  </div>
                  <svg
                    className="ml-auto opacity-50 group-hover:opacity-100 transition-opacity"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M1 11L11 1M11 1H4M11 1V8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Content column */}
          <div>
            {book.seriesLabel && (
              <Link
                href={`/series/${book.series}`}
                className="inline-block text-xs tracking-[0.25em] text-gold uppercase mb-4 hover:text-gold-light transition-colors duration-300"
              >
                Série {book.seriesLabel}
              </Link>
            )}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-text font-light leading-tight mb-3">
              {book.title}
            </h1>
            <p className="font-display text-3xl text-gold mb-10">{book.price}</p>

            <div className="h-px w-16 bg-gold-dark mb-10" />

            {/* Long summary */}
            <div className="space-y-5 text-text-secondary leading-relaxed mb-14">
              {book.summaryLong.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Book details */}
            <div className="border border-border p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
              <div>
                <p className="text-[10px] tracking-[0.25em] text-gold uppercase mb-1">
                  Format
                </p>
                <p className="text-text-secondary text-sm">{book.format}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] text-gold uppercase mb-1">
                  Pages
                </p>
                <p className="text-text-secondary text-sm">{book.pages} pages</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] text-gold uppercase mb-1">
                  ISBN
                </p>
                <p className="text-text-secondary text-sm font-mono">{book.isbn}</p>
              </div>
              {book.seriesLabel && (
                <div>
                  <p className="text-[10px] tracking-[0.25em] text-gold uppercase mb-1">
                    Série
                  </p>
                  <p className="text-text-secondary text-sm">{book.seriesLabel}</p>
                </div>
              )}
              <div>
                <p className="text-[10px] tracking-[0.25em] text-gold uppercase mb-1">
                  Éditeur
                </p>
                <p className="text-text-secondary text-sm">KUNUZ ADIN Éditions — KOMBOKOM</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] text-gold uppercase mb-1">
                  Langue
                </p>
                <p className="text-text-secondary text-sm">Français</p>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-10">
              <Link
                href="/livres"
                className="text-xs tracking-widest text-text-secondary hover:text-gold uppercase transition-colors duration-300 inline-flex items-center gap-2"
              >
                ← Retour au catalogue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
