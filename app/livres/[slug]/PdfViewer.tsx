"use client";

import { useState } from "react";

interface Props {
  src: string;
  bookTitle: string;
  primaryLink: { label: string; sublabel: string; url: string };
}

export default function PdfViewer({ src, bookTitle, primaryLink }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      {/* PDF frame */}
      <div className="relative border border-border bg-card h-[400px] lg:h-[600px]">
        {/* Loading state */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
            <div className="h-px w-10 bg-gold-dark" />
            <p className="text-text-secondary/50 text-xs tracking-[0.2em] uppercase">
              Chargement de l&rsquo;extrait…
            </p>
            <div className="h-px w-10 bg-gold-dark" />
          </div>
        )}
        <iframe
          src={src}
          title={`Extrait · ${bookTitle}`}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ border: "none" }}
        />
      </div>

      {/* Fallback for browsers that block inline PDF */}
      <p className="text-xs text-text-secondary/40 mt-3">
        Si l&rsquo;extrait ne s&rsquo;affiche pas,{" "}
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold/70 hover:text-gold underline underline-offset-2 transition-colors duration-300"
        >
          ouvrez-le dans un nouvel onglet
        </a>
        .
      </p>

      {/* Commander CTA */}
      <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
        <a
          href={primaryLink.url}
          className="inline-flex items-center gap-3 bg-gold text-bg text-xs tracking-widest uppercase px-8 py-4 hover:bg-gold-light transition-colors duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {primaryLink.label} · {primaryLink.sublabel}
        </a>
      </div>
    </div>
  );
}
