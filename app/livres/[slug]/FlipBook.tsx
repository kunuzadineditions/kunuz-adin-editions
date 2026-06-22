"use client";

import { useEffect, useRef, useState } from "react";
import { PageFlip } from "page-flip";

// Page ratio for the extracted images: 840 × 1190 px
const PAGE_H_OVER_W = 1190 / 840;

interface Props {
  pages: string[];
  bookTitle: string;
  primaryLink: { label: string; sublabel: string; url: string };
}

export default function FlipBook({ pages, bookTitle, primaryLink }: Props) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const pfRef    = useRef<PageFlip | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [ready,       setReady]       = useState(false);
  const [bookH,       setBookH]       = useState(0);

  useEffect(() => {
    if (!wrapRef.current || !mountRef.current) return;

    const containerW = wrapRef.current.clientWidth;
    const isMobile   = containerW < 640;

    // Mobile: single page (full width). Desktop: two pages side-by-side (half width each).
    const pageW = isMobile ? containerW : Math.floor(containerW / 2);
    const pageH = Math.floor(pageW * PAGE_H_OVER_W);

    setBookH(pageH);

    const pf = new PageFlip(mountRef.current, {
      width:            pageW,
      height:           pageH,
      size:             "fixed",
      minWidth:         pageW,
      maxWidth:         pageW,
      minHeight:        pageH,
      maxHeight:        pageH,
      usePortrait:      isMobile,
      showCover:        false,
      drawShadow:       !isMobile,
      flippingTime:     620,
      mobileScrollSupport: false,
      clickEventForward:   false,
      useMouseEvents:   true,
      swipeDistance:    30,
      maxShadowOpacity: 0.45,
      startPage:        0,
    });

    pf.loadFromImages(pages);
    pf.on("flip", (e) => setCurrentPage(e.data as number));
    pf.on("init", () => setReady(true));
    pfRef.current = pf;

    return () => {
      try { pfRef.current?.destroy(); } catch { /* ignore */ }
      pfRef.current = null;
    };
  }, [pages]);

  const prev = () => pfRef.current?.flipPrev();
  const next = () => pfRef.current?.flipNext();

  return (
    <div>
      {/* ── Flipbook frame ── */}
      <div
        ref={wrapRef}
        className="relative border border-border overflow-hidden select-none"
        style={{
          background: "#0A0805",
          minHeight: bookH || 320,
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Loading ornament */}
        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none">
            <div className="h-px w-12 bg-gold-dark" />
            <p className="text-text-secondary/40 text-[10px] tracking-[0.3em] uppercase">
              Chargement…
            </p>
            <div className="h-px w-12 bg-gold-dark" />
          </div>
        )}

        {/* PageFlip mount target – visibility driven by `ready` */}
        <div
          ref={mountRef}
          className="flex justify-center"
          style={{
            opacity:    ready ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />

        {/* ← → navigation */}
        {ready && (
          <>
            <button
              onClick={prev}
              aria-label="Page précédente"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10
                         w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center
                         border border-gold-dark/60 text-gold text-2xl leading-none
                         hover:border-gold hover:bg-gold/10 transition-all duration-300"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Page suivante"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10
                         w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center
                         border border-gold-dark/60 text-gold text-2xl leading-none
                         hover:border-gold hover:bg-gold/10 transition-all duration-300"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* ── Counter + CTA ── */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-border" />
          <span className="text-[10px] text-text-secondary/50 tracking-[0.25em] uppercase tabular-nums">
            {currentPage + 1} / {pages.length}
          </span>
          <div className="h-px w-8 bg-border" />
        </div>

        <a
          href={primaryLink.url}
          className="inline-flex items-center gap-3 bg-gold text-bg text-xs tracking-widest
                     uppercase px-7 py-3.5 hover:bg-gold-light transition-colors duration-300
                     self-start sm:self-auto"
        >
          <BookIcon />
          {primaryLink.label} · {primaryLink.sublabel}
        </a>
      </div>
    </div>
  );
}

function BookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
