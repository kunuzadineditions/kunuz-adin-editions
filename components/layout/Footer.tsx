import Link from "next/link";

const footerLinks = {
  Catalogue: [
    { href: "/livres", label: "Tous les livres" },
    { href: "/series", label: "Séries" },
    { href: "/nouveautes", label: "Nouveautés" },
  ],
  Maison: [
    { href: "/auteur", label: "Ahmed K." },
    { href: "/blog", label: "Blog" },
    { href: "/a-propos", label: "À propos" },
  ],
  Boutique: [
    { href: "/boutique", label: "Commander" },
    { href: "/contact", label: "Contact" },
    { href: "mailto:contact@kunuz-adin-editions.com", label: "contact@kunuz-adin-editions.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex flex-col leading-none mb-4 inline-block">
              <span
                className="text-2xl font-semibold tracking-[0.15em] text-gold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                KUNUZ ADIN
              </span>
              <span className="text-[10px] tracking-[0.35em] text-text-secondary uppercase mt-0.5">
                Éditions
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs mt-4">
              Une maison d&rsquo;édition islamique francophone dédiée à la transmission du savoir authentique.
            </p>
            {/* Arabic slogan */}
            <p
              className="text-gold text-xl mt-5 text-right"
              style={{ fontFamily: "var(--font-arabic)" }}
              dir="rtl"
              lang="ar"
            >
              كنوز الدين
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs tracking-[0.25em] text-gold uppercase mb-5">
                {category}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-border mt-12 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-secondary tracking-wide">
          <span>
            &copy; {new Date().getFullYear()} KUNUZ ADIN ÉDITIONS. Tous droits réservés.
          </span>
          <div className="flex gap-5">
            <Link href="/mentions-legales" className="hover:text-gold transition-colors duration-300">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-gold transition-colors duration-300">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
