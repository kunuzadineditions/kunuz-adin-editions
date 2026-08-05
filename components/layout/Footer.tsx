import Link from "next/link";

const footerLinks = {
  Catalogue: [
    { href: "/livres", label: "Tous les livres" },
    { href: "/series", label: "Séries" },
  ],
  Maison: [
    { href: "/auteur", label: "Ahmed K." },
    { href: "/blog", label: "Blog" },
  ],
  Boutique: [
    { href: "/boutique", label: "Commander" },
    { href: "/contact", label: "Contact" },
    { href: "mailto:contact@kunuz-adin-editions.com", label: "contact@kunuz-adin-editions.com" },
  ],
};

const socialLinks = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@kunuzadineditions",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kunuz_adin_editions/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@kunuz.adin.editions",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: "Snapchat",
    href: "https://snapchat.com/t/MB4tdVbf",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.166.006C9.033-.146 6.009 1.58 4.443 4.395c-.498.904-.458 1.988-.487 2.998-.318.167-.66.265-1.013.289-.332.02-.669-.072-.948-.26l-.006-.004a.534.534 0 0 0-.313-.096.513.513 0 0 0-.164.029c-.24.098-.347.382-.238.62.236.557.75.952 1.343 1.045.155.054.157.095.038.28-.288.447-.701.826-1.188 1.068-.325.142-.683.198-1.044.162-.265-.031-.38.114-.348.266.03.132.143.25.314.282l.091.018c.632.109 1.278.131 1.916.069.146-.015.288-.04.427-.072.005.096-.001.192-.017.284-.131.75-.55 1.413-1.173 1.847-.109.073-.15.204-.096.318.044.097.141.163.248.165.14.004.279.02.418.044.921.157 1.793.489 2.584.975.48.294 1.024.445 1.578.445.222 0 .443-.022.661-.068.594-.118 1.154-.386 1.644-.737.421-.3.895-.478 1.385-.478.488 0 .961.176 1.385.478.49.351 1.05.619 1.644.737.218.046.439.068.661.068.554 0 1.098-.151 1.578-.445.791-.486 1.663-.818 2.584-.975.139-.024.278-.04.418-.044.107-.002.204-.068.248-.165.054-.114.013-.245-.096-.318-.623-.434-1.042-1.097-1.173-1.847a1.92 1.92 0 0 1-.017-.284c.139.032.281.057.427.072.638.062 1.284.04 1.916-.069l.091-.018c.171-.032.284-.15.314-.282.032-.152-.083-.297-.348-.266-.361.036-.719-.02-1.044-.162-.487-.242-.9-.621-1.188-1.068-.119-.185-.117-.226.038-.28.593-.093 1.107-.488 1.343-1.045.109-.238.002-.522-.238-.62a.513.513 0 0 0-.164-.029.534.534 0 0 0-.313.096l-.006.004c-.279.188-.616.28-.948.26-.353-.024-.695-.122-1.013-.289-.029-1.01.011-2.094-.487-2.998C18.157 1.58 15.133-.146 12.166.006z" />
      </svg>
    ),
  },
];

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
            {/* Social links */}
            <div className="mt-6">
              <p className="text-[10px] tracking-[0.25em] text-gold-dark uppercase mb-3">
                Suivez-nous
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-gold-dark hover:text-gold transition-colors duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
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
