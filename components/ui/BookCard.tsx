import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  title: string;
  subtitle?: string;
  price: string;
  summary: string;
  slug?: string;
  amazonUrl?: string;
  ctaLabel?: string;
  ctaSublabel?: string;
  coverColor?: string;
  coverImage?: string;
}

export default function BookCard({
  title,
  subtitle,
  price,
  summary,
  slug,
  amazonUrl,
  ctaLabel = "Commander",
  ctaSublabel,
  coverColor = "#1A1510",
  coverImage,
}: BookCardProps) {
  const href = slug ? `/livres/${slug}` : (amazonUrl ?? "#");
  const isExternal = !slug && !!amazonUrl;

  return (
    <article className="flex flex-col sm:flex-row gap-7 bg-card border border-border p-6 sm:p-8 hover:border-gold-dark transition-colors duration-500">
      {/* Cover */}
      <div
        className="relative flex-shrink-0 w-full sm:w-36 aspect-[3/4] sm:aspect-auto sm:h-48 overflow-hidden flex flex-col items-center justify-center text-center p-4"
        style={{
          backgroundColor: coverColor,
          boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.15), 4px 6px 24px rgba(0,0,0,0.6)",
        }}
      >
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 144px"
          />
        ) : (
          <>
            <div className="h-px w-8 bg-gold mb-3" />
            <p
              className="font-display text-gold text-sm leading-snug"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </p>
            <div className="h-px w-8 bg-gold mt-3" />
          </>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <h3 className="font-display text-xl sm:text-2xl text-text leading-tight mb-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs tracking-widest text-gold uppercase mb-4">{subtitle}</p>
          )}
          <p className="text-text-secondary text-sm leading-relaxed mb-6">{summary}</p>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span className="font-display text-2xl text-gold">{price}</span>
          {isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-widest text-bg bg-gold px-5 py-2.5 uppercase hover:bg-gold-light transition-colors duration-300"
            >
              <CtaContent label={ctaLabel} sublabel={ctaSublabel} />
            </a>
          ) : (
            <Link
              href={href}
              className="inline-flex items-center gap-2 text-xs tracking-widest text-bg bg-gold px-5 py-2.5 uppercase hover:bg-gold-light transition-colors duration-300"
            >
              <CtaContent label={ctaLabel} sublabel={ctaSublabel} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function CtaContent({ label, sublabel }: { label: string; sublabel?: string }) {
  return (
    <>
      <span>{label}{sublabel ? ` — ${sublabel}` : ""}</span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M1 11L11 1M11 1H4M11 1V8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
