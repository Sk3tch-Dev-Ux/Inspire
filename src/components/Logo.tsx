interface LogoProps {
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { icon: 28, text: 'text-lg', gap: 'gap-2' },
  md: { icon: 36, text: 'text-xl', gap: 'gap-2.5' },
  lg: { icon: 48, text: 'text-3xl', gap: 'gap-3' },
};

export default function Logo({ showWordmark = true, size = 'md', className = '' }: LogoProps) {
  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="logo-gradient-reverse" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* Outer rounded square frame */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="10"
          stroke="url(#logo-gradient)"
          strokeWidth="2.5"
          fill="none"
        />

        {/* CPU die / central processor */}
        <rect
          x="14"
          y="14"
          width="20"
          height="20"
          rx="3"
          fill="url(#logo-gradient)"
          opacity="0.15"
        />
        <rect
          x="14"
          y="14"
          width="20"
          height="20"
          rx="3"
          stroke="url(#logo-gradient)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Inner chip detail */}
        <rect
          x="19"
          y="19"
          width="10"
          height="10"
          rx="1.5"
          fill="url(#logo-gradient)"
          opacity="0.4"
        />

        {/* Circuit pins - top */}
        <line x1="20" y1="14" x2="20" y2="7" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="14" x2="24" y2="5" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="14" x2="28" y2="7" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" />

        {/* Circuit pins - bottom */}
        <line x1="20" y1="34" x2="20" y2="41" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="34" x2="24" y2="43" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="34" x2="28" y2="41" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" />

        {/* Circuit pins - left */}
        <line x1="14" y1="20" x2="7" y2="20" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="24" x2="5" y2="24" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="28" x2="7" y2="28" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" />

        {/* Circuit pins - right */}
        <line x1="34" y1="20" x2="41" y2="20" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="34" y1="24" x2="43" y2="24" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="34" y1="28" x2="41" y2="28" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {showWordmark && (
        <span className={`${s.text} font-bold tracking-wider`}>
          <span className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">
            INSPIRE
          </span>
          <span className="text-pearl font-light ml-1">PC</span>
        </span>
      )}
    </div>
  );
}
