"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export type Temoignage = {
  id: number;
  nom: string;
  message: string;
};

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
          className={`relative overflow-hidden${isOpening ? " livre-cover-open" : ""}`}
          style={{
            width: "min(340px, 100%)",
            aspectRatio: "2/3",
            boxShadow: "0 24px 64px rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.6)",
          }}
        >
          {/* Image de couverture */}
          <Image
            src="/images/couverture-livre-dor.png"
            alt=""
            fill
            className="object-cover"
            sizes="340px"
            priority
          />

          {/* Textes dans la zone centrale de l'arche — padding calibré pour rester hors du cadre doré */}
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center gap-4"
            style={{ padding: "8% 17%" }}
          >
            {/* Logo */}
            <div className="relative w-14 h-14">
              <Image
                src="/images/logo-livre-dor.png"
                alt="KUNUZ ADIN ÉDITIONS"
                fill
                className="object-contain"
                sizes="56px"
              />
            </div>

            <p
              className="text-[9px] tracking-[0.35em] uppercase"
              style={{ color: "#8B6914", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
            >
              KUNUZ ADIN ÉDITIONS
            </p>

            <h2
              className="font-display font-light leading-none"
              style={{ fontSize: 38, color: "#C9A84C", textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
            >
              Livre d'or
            </h2>

            <p
              className="font-display text-sm italic font-light"
              style={{ color: "#A89F8C", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
            >
              Paroles de cœurs
            </p>

            {/* Inscription arabe — texte fourni verbatim, ne pas modifier */}
            <p
              dir="rtl"
              lang="ar"
              style={{
                fontFamily: "var(--font-amiri)",
                fontSize: 20,
                color: "rgba(201,168,76,0.7)",
                textShadow: "0 2px 8px rgba(0,0,0,0.9)",
              }}
            >
              دفتر القلوب
            </p>

            <button
              onClick={openBook}
              disabled={isOpening}
              className="mt-1 px-6 py-2 border border-gold/50 text-gold text-[9px] tracking-[0.3em] uppercase hover:bg-gold/10 transition-colors duration-300 disabled:opacity-40"
              style={{ backdropFilter: "blur(2px)" }}
            >
              Ouvrir le livre
            </button>

            <p
              className="text-[8px] tracking-[0.25em] uppercase"
              style={{ color: "rgba(168,159,140,0.5)" }}
            >
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
          {/* Feuille animée — parchemin */}
          <div
            key={pageKey}
            className={dir === "next" ? "livre-page-in-next" : "livre-page-in-prev"}
            style={{
              backgroundImage: "url('/images/page-parchemin.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "1px solid rgba(110,80,40,0.35)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(200,170,110,0.15)",
            }}
          >
            {/* En-tête */}
            <div className="px-8 pt-7 pb-4">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1" style={{ background: "rgba(80,55,25,0.4)" }} />
                <p
                  className="text-[8px] tracking-[0.3em] uppercase whitespace-nowrap"
                  style={{ color: "rgba(80,55,25,0.65)" }}
                >
                  Livre d'or · {pageIdx + 1}/{total}
                </p>
                <div className="h-px flex-1" style={{ background: "rgba(80,55,25,0.4)" }} />
              </div>
            </div>

            {/* Corps du témoignage */}
            <div className="px-8 py-4 flex flex-col" style={{ minHeight: 220 }}>
              <p
                className="font-display leading-none -ml-1 mb-2"
                aria-hidden
                style={{ fontSize: 52, color: "rgba(80,55,25,0.22)", lineHeight: 1 }}
              >
                &ldquo;
              </p>
              <p
                className="font-display italic font-light leading-relaxed"
                style={{ fontSize: 17, color: "#3a2c1a" }}
              >
                {t.message}
              </p>
              <p
                className="font-display leading-none text-right -mr-1 mt-2"
                aria-hidden
                style={{ fontSize: 52, color: "rgba(80,55,25,0.22)", lineHeight: 1 }}
              >
                &rdquo;
              </p>
            </div>

            {/* Attribution */}
            <div className="px-8 pb-5">
              <p
                className="text-right tracking-[0.2em] uppercase"
                style={{ fontSize: 11, color: "#5c3f1c" }}
              >
                — {t.nom}
              </p>
            </div>

            {/* Pied */}
            <div className="px-8 pb-7">
              <div className="h-px" style={{ background: "rgba(80,55,25,0.4)" }} />
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
