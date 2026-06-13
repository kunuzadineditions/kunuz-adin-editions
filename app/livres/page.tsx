import type { Metadata } from "next";
import { books, series } from "@/lib/books";
import BooksClient from "./BooksClient";

export const metadata: Metadata = {
  title: "Livres",
  description:
    "Catalogue complet de KUNUZ ADIN Éditions — livres islamiques francophones ancrés dans la tradition.",
};

export default function LivresPage() {
  const seriesOptions = Object.entries(series).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gold-dark" />
            <p className="text-xs tracking-[0.3em] text-gold uppercase">
              Catalogue
            </p>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-text font-light mb-4">
            Nos livres
          </h1>
          <p className="text-text-secondary max-w-lg leading-relaxed">
            Des ouvrages conçus pour nourrir le cœur, ancrer la foi et accompagner le travail intérieur — dans la langue de ceux qui grandissent entre deux rives.
          </p>
          <div className="h-px w-24 bg-gold-dark mt-8" />
        </div>

        {/* Client filter + grid */}
        <BooksClient books={books} seriesOptions={seriesOptions} />
      </div>
    </div>
  );
}
