import { books } from "@/lib/books";
import BookCard from "@/components/ui/BookCard";

const FEATURED_SLUGS = ["tu-pries-mais-tu-ne-tapaises-pas", "carnet-coeur-vivant"];

const featuredBooks = FEATURED_SLUGS
  .map((slug) => books.find((b) => b.slug === slug))
  .filter((b): b is NonNullable<typeof b> => b !== undefined);

export default function FeaturedBooks() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4">
            Notre catalogue
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-text font-light">
            Livres en vedette
          </h2>
          <div className="h-px w-16 bg-gold-dark mx-auto mt-6" />
        </div>

        {/* Book cards */}
        <div className="flex flex-col gap-6">
          {featuredBooks.map((book) => {
            const primary = book.purchaseLinks.find((l) => l.primary) ?? book.purchaseLinks[0];
            return (
              <BookCard
                key={book.slug}
                slug={book.slug}
                title={book.title}
                subtitle={book.seriesLabel ?? undefined}
                price={book.price}
                summary={book.summaryShort}
                ctaLabel={primary?.label}
                ctaSublabel={primary?.sublabel}
                coverColor={book.coverColor}
                coverImage={book.coverImage}
              />
            );
          })}
        </div>

        {/* Link to full catalogue */}
        <div className="text-center mt-12">
          <a
            href="/livres"
            className="text-sm tracking-widest text-gold uppercase hover:text-gold-light transition-colors duration-300 inline-flex items-center gap-2"
          >
            Voir tout le catalogue
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
