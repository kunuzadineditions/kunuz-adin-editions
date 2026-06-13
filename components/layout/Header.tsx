"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/livres", label: "Livres" },
  { href: "/series", label: "Séries" },
  { href: "/blog", label: "Blog" },
  { href: "/boutique", label: "Boutique" },
  { href: "/auteur", label: "Auteur" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className="text-xl sm:text-2xl font-semibold tracking-[0.15em] text-gold group-hover:text-gold-light transition-colors duration-300"
              style={{ fontFamily: "var(--font-display)" }}
            >
              KUNUZ ADIN
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.35em] text-text-secondary uppercase mt-0.5">
              Éditions
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-widest text-text-secondary hover:text-gold transition-colors duration-300 uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px w-6 bg-gold transition-transform duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-gold transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-gold transition-transform duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80 border-t border-border" : "max-h-0"
        }`}
      >
        <nav className="px-4 py-6 flex flex-col gap-5" aria-label="Menu mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest text-text-secondary hover:text-gold transition-colors duration-300 uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
