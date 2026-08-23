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
      viewBox="0 0 420 280"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Carte stylisée du Proche-Orient, Damas en Syrie"
      className="w-full block"
      style={{ background: "#080808" }}
    >
      {/*
        Système de coordonnées :
        x = (lon - 34.5) * 44.2   [34.5°E → x=0, 44°E → x=420]
        y = (38.0 - lat) * 46.7   [38°N → y=0, 32°N → y=280]
        Damas : 36.3°E, 33.5°N → (80, 210)
      */}

      {/* Mer Méditerranée */}
      <path
        d="M 0,0 L 57,0 L 57,67 L 57,115 L 52,155 L 27,229 L 20,280 L 0,280 Z"
        fill="#050d18"
      />

      {/* Turquie */}
      <path
        d="M 57,0 L 420,0 L 420,30 L 347,30 L 243,55 L 155,44 L 103,42 L 93,54 L 57,67 L 57,0 Z"
        fill="rgba(255,255,255,0.018)"
        stroke="rgba(201,168,76,0.22)"
        strokeWidth="0.75"
      />

      {/* Irak */}
      <path
        d="M 347,30 L 420,30 L 420,280 L 189,280 L 189,256 L 290,166 L 309,117 L 347,30 Z"
        fill="rgba(255,255,255,0.018)"
        stroke="rgba(201,168,76,0.22)"
        strokeWidth="0.75"
      />

      {/* Jordanie / Israël (sud) */}
      <path
        d="M 27,229 L 52,240 L 111,250 L 189,256 L 189,280 L 20,280 Z"
        fill="rgba(255,255,255,0.018)"
        stroke="rgba(201,168,76,0.22)"
        strokeWidth="0.75"
      />

      {/* Liban — tampon visible entre Damas et la Méditerranée */}
      <path
        d="M 52,155 L 83,155 L 73,187 L 61,210 L 27,229 Z"
        fill="rgba(255,255,255,0.035)"
        stroke="rgba(201,168,76,0.28)"
        strokeWidth="0.8"
      />

      {/* Syrie — forme corrigée d'après géographie réelle */}
      <path
        d="M 57,67 L 93,54 L 103,42 L 155,44 L 243,55 L 347,30 L 309,117 L 290,166 L 189,256 L 111,250 L 52,240 L 61,210 L 73,187 L 83,155 L 57,115 Z"
        fill="rgba(201,168,76,0.055)"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Damas — repositionné : sud-ouest de la Syrie, à l'est du Liban */}
      <circle cx="80" cy="210" r="5" fill="none" stroke="#C9A84C" strokeWidth="0.8">
        <animate attributeName="r" from="5" to="20" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.55" to="0" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="210" r="4" fill="#C9A84C" />
      <circle cx="80" cy="210" r="2" fill="#080808" />

      {/* Étiquette Damas */}
      <line
        x1="80" y1="206" x2="80" y2="196"
        stroke="rgba(201,168,76,0.5)"
        strokeWidth="0.8"
      />
      <text
        x="88"
        y="200"
        fill="#C9A84C"
        fontSize="10"
        fontFamily="Georgia, 'Times New Roman', serif"
        letterSpacing="1.8"
      >
        DAMAS
      </text>

      {/* Labels des pays */}
      <text
        x="230"
        y="22"
        fill="rgba(201,168,76,0.65)"
        fontSize="7.5"
        fontFamily="Georgia, serif"
        textAnchor="middle"
        letterSpacing="2"
      >
        TURQUIE
      </text>
      <text
        x="215"
        y="130"
        fill="#C9A84C"
        fontSize="9"
        fontFamily="Georgia, serif"
        textAnchor="middle"
        letterSpacing="2.5"
      >
        SYRIE
      </text>
      <text
        x="375"
        y="160"
        fill="rgba(201,168,76,0.65)"
        fontSize="7.5"
        fontFamily="Georgia, serif"
        textAnchor="middle"
        letterSpacing="1.5"
      >
        IRAK
      </text>
      <text
        x="120"
        y="270"
        fill="rgba(201,168,76,0.65)"
        fontSize="7.5"
        fontFamily="Georgia, serif"
        textAnchor="middle"
        letterSpacing="1.5"
      >
        JORDANIE
      </text>

      {/* Label Liban (incliné le long du pays) */}
      <text
        x="56"
        y="185"
        fill="rgba(201,168,76,0.65)"
        fontSize="6.5"
        fontFamily="Georgia, serif"
        textAnchor="middle"
        transform="rotate(-72, 56, 185)"
      >
        LIBAN
      </text>

      {/* Méditerranée (incliné) */}
      <text
        x="22"
        y="140"
        fill="rgba(201,168,76,0.45)"
        fontSize="6.5"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        letterSpacing="1.2"
        transform="rotate(-80, 22, 140)"
      >
        Méditerranée
      </text>

      {/* Coins d'archives */}
      <g stroke="rgba(201,168,76,0.32)" strokeWidth="1" fill="none">
        <polyline points="0,9 0,0 9,0" />
        <polyline points="411,0 420,0 420,9" />
        <polyline points="0,271 0,280 9,280" />
        <polyline points="411,280 420,280 420,271" />
      </g>
    </svg>
  );
}
