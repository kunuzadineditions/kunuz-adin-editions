import type { Metadata } from "next";
import Link from "next/link";
import { books } from "@/lib/books";
import BookCard from "@/components/shop/BookCard";
import BoutiqueContactForm from "./BoutiqueContactForm";

export const metadata: Metadata = {
  title: "Commander",
  description:
    "Commandez les livres KUNUZ ADIN Éditions, version reliée sur notre site ou brochée sur Amazon. Commandes groupées pour bibliothèques, mosquées et associations.",
};

export default function BoutiquePage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Page header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gold-dark" />
            <p className="text-xs tracking-[0.3em] text-gold uppercase">Boutique</p>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-text font-light mb-4">
            Commander
          </h1>
          <p className="text-text-secondary max-w-lg leading-relaxed">
            Chaque livre est disponible en version reliée sur notre site ou en version brochée sur Amazon.
          </p>
          <div className="h-px w-24 bg-gold-dark mt-8" />
        </div>

        {/* Books */}
        <div className="flex flex-col gap-6 mb-24">
          {books.map((book) => {
            const primary   = book.purchaseLinks.find((l) => l.primary) ?? book.purchaseLinks[0];
            const secondary = book.purchaseLinks.find((l) => !l.primary);
            return (
              <BookCard
                key={book.slug}
                slug={book.slug}
                title={book.title}
                price={book.price}
                seriesLabel={book.seriesLabel}
                companion={book.companion}
                summaryShort={book.summaryShort}
                coverColor={book.coverColor}
                coverImage={book.coverImage}
                primaryLink={{
                  label:       primary.label,
                  sublabel:    primary.sublabel,
                  url:         primary.url,
                  stripePrice: primary.stripePrice,
                }}
                secondaryLink={
                  secondary
                    ? { label: secondary.label, sublabel: secondary.sublabel, url: secondary.url }
                    : undefined
                }
              />
            );
          })}
        </div>

        {/* Ornament */}
        <div className="flex items-center gap-4 mb-20">
          <div className="h-px flex-1 bg-border" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-dark" />
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Commandes groupées */}
        <div>
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4">
              Commandes groupées
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-text font-light mb-4">
              Bibliothèques, mosquées, associations
            </h2>
            <p className="text-text-secondary leading-relaxed max-w-xl">
              Vous souhaitez acquérir plusieurs exemplaires pour votre structure ? Nous proposons des tarifs adaptés aux commandes groupées. Contactez-nous en remplissant le formulaire ci-dessous.
            </p>
          </div>

          <div className="border border-border p-6 sm:p-10">
            <BoutiqueContactForm />
          </div>
        </div>

      </div>
    </div>
  );
}
