interface Props {
  fadingOut: boolean;
}

export default function Splash({ fadingOut }: Props) {
  return (
    <div className={`splash${fadingOut ? ' fade-out' : ''}`} role="presentation" aria-hidden="true">
      <svg
        className="splash-art"
        viewBox="0 0 240 240"
        width="200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="splash-glow" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="#e6cd8f" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#e6cd8f" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="splash-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e6cd8f" />
            <stop offset="100%" stopColor="#c9a24a" />
          </linearGradient>
        </defs>

        <circle cx="120" cy="105" r="95" fill="url(#splash-glow)" />

        {/* rays */}
        <g stroke="url(#splash-gold)" strokeWidth="1" opacity="0.5">
          <line x1="120" y1="8" x2="120" y2="30" />
          <line x1="120" y1="8" x2="120" y2="30" transform="rotate(30 120 105)" />
          <line x1="120" y1="8" x2="120" y2="30" transform="rotate(-30 120 105)" />
          <line x1="120" y1="8" x2="120" y2="30" transform="rotate(60 120 105)" />
          <line x1="120" y1="8" x2="120" y2="30" transform="rotate(-60 120 105)" />
        </g>

        {/* open book */}
        <g transform="translate(120 128)">
          <path
            d="M0 -8 C -34 -22 -62 -16 -62 -2 L -62 46 C -34 32 -14 36 0 48 Z"
            fill="none"
            stroke="url(#splash-gold)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M0 -8 C 34 -22 62 -16 62 -2 L 62 46 C 34 32 14 36 0 48 Z"
            fill="none"
            stroke="url(#splash-gold)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M0 -8 L0 48" stroke="url(#splash-gold)" strokeWidth="2" />

          {/* page lines, left */}
          <g stroke="#e6cd8f" strokeWidth="1.4" opacity="0.55" strokeLinecap="round">
            <line x1="-48" y1="0" x2="-14" y2="6" />
            <line x1="-46" y1="10" x2="-14" y2="15" />
            <line x1="-44" y1="20" x2="-14" y2="24" />
            <line x1="-42" y1="30" x2="-14" y2="32" />
          </g>
          {/* page lines, right */}
          <g stroke="#e6cd8f" strokeWidth="1.4" opacity="0.55" strokeLinecap="round">
            <line x1="48" y1="0" x2="14" y2="6" />
            <line x1="46" y1="10" x2="14" y2="15" />
            <line x1="44" y1="20" x2="14" y2="24" />
            <line x1="42" y1="30" x2="14" y2="32" />
          </g>
        </g>
      </svg>

      <div className="splash-text">
        <span className="splash-title">말씀결</span>
        <span className="splash-tagline">말씀의 결을 따라 걷다</span>
      </div>
    </div>
  );
}
