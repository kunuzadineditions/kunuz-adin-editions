"use client";

import { useState } from "react";
import Link from "next/link";
import type { Book } from "@/lib/books";

function BookGridCard({ book }: { book: Book }) {
  return (
    <article className="group flex flex-col bg-card border border-border hover:border-gold-dark transition-colors duration-500">
      {/* Cover */}
      <Link href={`/livres/${book.slug}`} className="block">
        <div
          className="w-full aspect-[3/4] flex flex-col items-center justify-center text-center p-6 transition-opacity duration-300 group-hover:opacity-90"
          style={{
            backgroundColor: book.coverColor,
            boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.12)",
          }}
        >
          {book.seriesLabel && (
            <p className="text-[10px] tracking-[0.3em] text-gold-dark uppercase mb-4">
              {book.seriesLabel}
            </p>
          )}
          <div className="h-px w-8 bg-gold mb-4" />
          <p
            className="font-display text-gold text-base leading-snug px-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {book.title}
          </p>
          <div className="h-px w-8 bg-gold mt-4" />
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {book.seriesLabel && (
          <span className="text-[10px] tracking-[0.25em] text-gold uppercase self-start">
            {book.seriesLabel}
          </span>
        )}
        <Link href={`/livres/${book.slug}`}>
          <h2
            className="font-display text-lg text-text leading-snug hover:text-gold transition-colors duration-300"
          >
            {book.title}
          </h2>
        </Link>
        <p className="text-text-secondary text-sm leading-relaxed flex-1">
          {book.summaryShort}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="font-display text-xl text-gold">{book.price}</span>
          <Link
            href={`/livres/${book.slug}`}
            className="text-xs tracking-widest text-text-secondary hover:text-gold transition-colors duration-300 uppercase"
          >
            Détails →
          </Link>
        </div>
      </div>
    </article>
  );
}

type Props = {
  books: Book[];
  seriesOptions: { value: string; label: string }[];
};

export default function BooksClient({ books, seriesOptions }: Props) {
  const [activeSeries, setActiveSeries] = useState<string>("all");

  const filtered =
    activeSeries === "all"
      ? books
      : books.filter((b) => b.series === activeSeries);

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveSeries("all")}
          className={`text-xs tracking-widest uppercase px-5 py-2 border transition-colors duration-300 ${
            activeSeries === "all"
              ? "border-gold bg-gold/10 text-gold"
              : "border-border text-text-secondary hover:border-gold-dark hover:text-gold"
          }`}
        >
          Tous ({books.length})
        </button>
        {seriesOptions.map((s) => {
          const count = books.filter((b) => b.series === s.value).length;
          return (
            <button
              key={s.value}
              onClick={() => setActiveSeries(s.value)}
              className={`text-xs tracking-widest uppercase px-5 py-2 border transition-colors duration-300 ${
                activeSeries === s.value
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border text-text-secondary hover:border-gold-dark hover:text-gold"
              }`}
            >
              {s.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((book) => (
          <BookGridCard key={book.slug} book={book} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-text-secondary text-center py-16">
          Aucun livre dans cette sélection.
        </p>
      )}
    </>
  );
}
