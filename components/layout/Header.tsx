"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  // { href: "/livres", label: "Livres" },
  // { href: "/series", label: "Séries" },
  // { href: "/blog", label: "Blog" },
  // { href: "/boutique", label: "Boutique" },
  { href: "/fondateur", label: "Fondateur" },
  // { href: "/livre-audio", label: "Livre Audio" },
  // { href: "/auteur", label: "Auteur" },
  { href: "/", label: "Bientôt disponible" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300">
            <Image
              src="/logo-kunuz-adin.png"
              alt="KUNUZ ADIN ÉDITIONS"
              width={45}
              height={45}
              className="object-cover object-top rounded-sm"
              priority
            />
            <span className="flex flex-col leading-none">
              <span className="text-lg font-semibold tracking-[0.15em] text-gold" style={{ fontFamily: "var(--font-display)" }}>
                KUNUZ ADIN
              </span>
              <span className="text-[10px] tracking-[0.35em] text-text-secondary uppercase mt-0.5">
                Éditions
              </span>
            </span>
          </Link>

          {/* Desktop nav + cart */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8" aria-label="Navigation principale">
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

            {/* <CartButton totalItems={totalItems} onClick={openCart} /> */}
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            {/* <CartButton totalItems={totalItems} onClick={openCart} /> */}

            <button
              className="flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
            >
              <span className={`block h-px w-6 bg-gold transition-transform duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
              <span className={`block h-px w-6 bg-gold transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-6 bg-gold transition-transform duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
            </button>
          </div>
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

function CartButton({ totalItems, onClick }: { totalItems: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Panier${totalItems > 0 ? ` — ${totalItems} article${totalItems > 1 ? "s" : ""}` : ""}`}
      className="relative p-1.5 text-text-secondary hover:text-gold transition-colors duration-300"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-gold text-bg text-[10px] font-semibold rounded-full px-1 leading-none">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
}
