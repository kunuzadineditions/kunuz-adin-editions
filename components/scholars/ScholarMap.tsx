import type { ScholarPlace } from "@/lib/scholars";

export default function ScholarMap({ place }: { place: ScholarPlace }) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-4 mb-8">
        <p className="text-[10px] tracking-[0.25em] text-gold uppercase whitespace-nowrap">
          Son lieu
        </p>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="border border-border overflow-hidden">
        {place.mapKey === "damascus" && <DamascusMap />}
      </div>

      <div className="mt-5 flex items-start gap-3">
        <span className="text-gold-dark mt-0.5 text-xs flex-shrink-0" aria-hidden>
          ✦
        </span>
        <div>
          <p className="text-[9px] tracking-[0.3em] text-gold uppercase mb-1">
            {place.city}, {place.region}
          </p>
          {place.locationText && (
            <p className="text-text-secondary text-sm leading-relaxed">
              {place.locationText}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function DamascusMap() {
  return (
    <svg
      viewBox="0 0 420 240"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Carte stylisée du Proche-Orient, Damas en Syrie"
      className="w-full block"
      style={{ background: "#080808" }}
    >
      {/* Mer Méditerranée */}
      <path
        d="M 0,0 L 100,0 L 102,60 L 90,95 L 75,145 L 62,240 L 0,240 Z"
        fill="#050d18"
      />

      {/* Turquie */}
      <path
        d="M 100,0 L 420,0 L 420,38 L 355,38 L 290,44 L 208,45 L 136,48 L 102,60 L 100,0 Z"
        fill="rgba(255,255,255,0.018)"
        stroke="rgba(201,168,76,0.22)"
        strokeWidth="0.75"
      />

      {/* Irak */}
      <path
        d="M 355,38 L 420,38 L 420,240 L 218,240 L 218,170 L 320,148 L 334,106 L 355,38 Z"
        fill="rgba(255,255,255,0.018)"
        stroke="rgba(201,168,76,0.22)"
        strokeWidth="0.75"
      />

      {/* Jordanie */}
      <path
        d="M 62,240 L 75,145 L 90,148 L 95,172 L 143,174 L 218,170 L 218,240 Z"
        fill="rgba(255,255,255,0.018)"
        stroke="rgba(201,168,76,0.22)"
        strokeWidth="0.75"
      />

      {/* Liban */}
      <path
        d="M 90,95 L 110,108 L 90,148 L 72,152 L 75,120 Z"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(201,168,76,0.2)"
        strokeWidth="0.5"
      />

      {/* Syrie */}
      <path
        d="M 102,60 L 136,48 L 208,45 L 290,44 L 355,38 L 334,106 L 320,148 L 218,170 L 143,174 L 95,172 L 90,148 L 110,108 L 102,60 Z"
        fill="rgba(201,168,76,0.055)"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Damas — point avec animation SMIL (pas de JS) */}
      <circle cx="115" cy="152" r="5" fill="none" stroke="#C9A84C" strokeWidth="0.8">
        <animate attributeName="r" from="5" to="20" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.55" to="0" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="115" cy="152" r="4" fill="#C9A84C" />
      <circle cx="115" cy="152" r="2" fill="#080808" />

      {/* Étiquette Damas */}
      <line
        x1="115" y1="148" x2="115" y2="140"
        stroke="rgba(201,168,76,0.5)"
        strokeWidth="0.8"
      />
      <text
        x="123"
        y="144"
        fill="#C9A84C"
        fontSize="10"
        fontFamily="Georgia, 'Times New Roman', serif"
        letterSpacing="1.8"
      >
        DAMAS
      </text>

      {/* Labels des pays voisins */}
      <text
        x="248"
        y="25"
        fill="rgba(201,168,76,0.2)"
        fontSize="7.5"
        fontFamily="Georgia, serif"
        textAnchor="middle"
        letterSpacing="2"
      >
        TURQUIE
      </text>
      <text
        x="232"
        y="108"
        fill="rgba(201,168,76,0.18)"
        fontSize="8"
        fontFamily="Georgia, serif"
        textAnchor="middle"
        letterSpacing="2.5"
      >
        SYRIE
      </text>
      <text
        x="378"
        y="148"
        fill="rgba(201,168,76,0.17)"
        fontSize="7.5"
        fontFamily="Georgia, serif"
        textAnchor="middle"
        letterSpacing="1.5"
      >
        IRAK
      </text>
      <text
        x="142"
        y="218"
        fill="rgba(201,168,76,0.17)"
        fontSize="7.5"
        fontFamily="Georgia, serif"
        textAnchor="middle"
        letterSpacing="1.5"
      >
        JORDANIE
      </text>

      {/* Méditerranée (incliné) */}
      <text
        x="36"
        y="110"
        fill="rgba(201,168,76,0.17)"
        fontSize="6.5"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        letterSpacing="1.2"
        transform="rotate(-68, 36, 110)"
      >
        Méditerranée
      </text>

      {/* Coins d'archives */}
      <g stroke="rgba(201,168,76,0.32)" strokeWidth="1" fill="none">
        <polyline points="0,9 0,0 9,0" />
        <polyline points="411,0 420,0 420,9" />
        <polyline points="0,231 0,240 9,240" />
        <polyline points="411,240 420,240 420,231" />
      </g>
    </svg>
  );
}
