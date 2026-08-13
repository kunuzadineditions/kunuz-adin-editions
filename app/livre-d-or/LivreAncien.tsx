"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export type Temoignage = {
  id: number;
  nom: string;
  message: string;
};

function Ornament() {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="h-px flex-1 bg-gold-dark/60" />
      <span className="text-[8px] text-gold-dark">✦</span>
      <div className="h-px flex-1 bg-gold-dark/60" />
    </div>
  );
}

export default function LivreAncien({ temoignages }: { temoignages: Temoignage[] }) {
  const [isOpen, setIsOpen]       = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [pageIdx, setPageIdx]     = useState(0);
  const [pageKey, setPageKey]     = useState(0);
  const [dir, setDir]             = useState<"next" | "prev">("prev");
  const touchStartX               = useRef(0);
  const touchStartY               = useRef(0);
  const total                     = temoignages.length;

  function openBook() {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 480);
  }

  function closeBook() {
    setIsOpen(false);
    setPageIdx(0);
    setPageKey(0);
    setDir("prev");
  }

  function goNext() {
    if (pageIdx >= total - 1) return;
    setDir("next");
    setPageIdx((i) => i + 1);
    setPageKey((k) => k + 1);
  }

  function goPrev() {
    if (pageIdx <= 0) return;
    setDir("prev");
    setPageIdx((i) => i - 1);
    setPageKey((k) => k + 1);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
      if (dx < 0) goNext();
      else goPrev();
    }
  }

  if (total === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-text-secondary/40 text-lg italic font-light">
          Les premiers témoignages seront publiés bientôt, in shā' Allah.
        </p>
      </div>
    );
  }

  const t = temoignages[pageIdx];

  return (
    <div className="flex flex-col items-center select-none">
      {!isOpen ? (
        /* ── COUVERTURE ── */
        <div
          className={isOpening ? "livre-cover-open" : ""}
          style={{
            width: "min(340px, 100%)",
            background: "#0D0D0D",
            border: "1px solid rgba(201,168,76,0.35)",
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(201,168,76,0.06)",
          }}
        >
          <div className="flex flex-col items-center text-center px-10 py-14 gap-5">
            <Ornament />

            {/* Logo — placer le fichier dans public/images/logo-livre-dor.png */}
            <div className="relative w-16 h-16">
              <Image
                src="/images/logo-livre-dor.png"
                alt="KUNUZ ADIN ÉDITIONS"
                fill
                className="object-contain"
                sizes="64px"
              />
            </div>

            <p className="text-[9px] tracking-[0.35em] text-gold-dark uppercase">
              KUNUZ ADIN ÉDITIONS
            </p>

            <Ornament />

            <h2
              className="font-display font-light leading-none mt-1"
              style={{ fontSize: 42, color: "#C9A84C" }}
            >
              Livre d'or
            </h2>

            <p className="font-display text-base text-text-secondary italic font-light">
              Paroles de cœurs
            </p>

            {/* Inscription arabe — texte fourni verbatim, ne pas modifier */}
            <p
              className="mt-1"
              dir="rtl"
              lang="ar"
              style={{
                fontFamily: "var(--font-amiri)",
                fontSize: 22,
                color: "rgba(201,168,76,0.65)",
              }}
            >
              دفتر القلوب
            </p>

            <div className="mt-1 w-full">
              <Ornament />
            </div>

            <button
              onClick={openBook}
              disabled={isOpening}
              className="mt-2 px-7 py-2.5 border border-gold/40 text-gold text-[9px] tracking-[0.3em] uppercase hover:bg-gold/10 transition-colors duration-300 disabled:opacity-40"
            >
              Ouvrir le livre
            </button>

            <p className="text-[9px] tracking-[0.3em] text-text-secondary/30 uppercase">
              {total} témoignage{total > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      ) : (
        /* ── PAGE ── */
        <div
          className="flex flex-col"
          style={{ width: "min(340px, 100%)" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Feuille animée */}
          <div
            key={pageKey}
            className={dir === "next" ? "livre-page-in-next" : "livre-page-in-prev"}
            style={{
              background: "#0F0C08",
              border: "1px solid rgba(201,168,76,0.2)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.9)",
            }}
          >
            {/* En-tête */}
            <div className="px-8 pt-7 pb-4">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-gold-dark/40" />
                <p className="text-[8px] tracking-[0.3em] text-gold-dark/60 uppercase whitespace-nowrap">
                  Livre d'or · {pageIdx + 1}/{total}
                </p>
                <div className="h-px flex-1 bg-gold-dark/40" />
              </div>
            </div>

            {/* Corps du témoignage */}
            <div className="px-8 py-4 flex flex-col" style={{ minHeight: 220 }}>
              <p
                className="font-display leading-none text-gold/25 -ml-1 mb-2"
                aria-hidden
                style={{ fontSize: 52 }}
              >
                &ldquo;
              </p>
              <p className="font-display text-[17px] text-text italic font-light leading-relaxed">
                {t.message}
              </p>
              <p
                className="font-display leading-none text-gold/25 text-right -mr-1 mt-2"
                aria-hidden
                style={{ fontSize: 52 }}
              >
                &rdquo;
              </p>
            </div>

            {/* Attribution */}
            <div className="px-8 pb-5">
              <p className="text-right text-[11px] tracking-[0.2em] text-gold uppercase">
                — {t.nom}
              </p>
            </div>

            {/* Pied */}
            <div className="px-8 pb-7">
              <div className="h-px bg-gold-dark/40" />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-5 px-1">
            <button
              onClick={goPrev}
              disabled={pageIdx === 0}
              aria-label="Témoignage précédent"
              className="p-2 text-gold-dark hover:text-gold transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <span className="text-[10px] tracking-[0.2em] text-text-secondary/40 tabular-nums">
              {pageIdx + 1} / {total}
            </span>

            <button
              onClick={goNext}
              disabled={pageIdx === total - 1}
              aria-label="Témoignage suivant"
              className="p-2 text-gold-dark hover:text-gold transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Fermer */}
          <button
            onClick={closeBook}
            className="mt-6 mx-auto text-[9px] tracking-[0.3em] text-text-secondary/30 hover:text-text-secondary/60 uppercase transition-colors duration-200"
          >
            Fermer le livre
          </button>
        </div>
      )}
    </div>
  );
}
