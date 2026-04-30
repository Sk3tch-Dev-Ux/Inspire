/**
 * Inspire Development — Logo (Phase 1 brand kit)
 *
 * Three variants:
 *   - "wordmark" (default): full lockup, "inspire⚡ DEVELOPMENT", with the
 *     bolt replacing the dot of the `i` in `inspire`. Use in header/nav.
 *   - "mark": just the bolt on a rounded-square ink background — for
 *     favicons, Discord avatars, app tile icons.
 *   - "inline": single-line "inspire⚡ Development" without the stacked
 *     DEVELOPMENT subtitle — for compact contexts like the footer.
 *
 * Sizing scales the whole thing — pick `sm` for inline contexts,
 * `md` for nav, `lg` for hero treatments. The bolt is hand-drawn,
 * not the lightning emoji, so it always renders identically across
 * platforms.
 *
 * Backwards compatibility: existing call sites pass `showWordmark`,
 * which is honored as a fallback (true → wordmark, false → mark).
 */

interface LogoProps {
  variant?: 'wordmark' | 'mark' | 'inline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  /** Force light background colors for use on white. Defaults to dark. */
  onLight?: boolean;
  /** Legacy: pre-rebrand prop. true ≡ wordmark, false ≡ mark. */
  showWordmark?: boolean;
}

const SIZES = {
  sm: { wordmark: 'text-xl', subtitle: 'text-[9px]', bolt: 18, mark: 28 },
  md: { wordmark: 'text-2xl', subtitle: 'text-[10px]', bolt: 22, mark: 36 },
  lg: { wordmark: 'text-4xl', subtitle: 'text-xs', bolt: 32, mark: 56 },
  xl: { wordmark: 'text-6xl', subtitle: 'text-sm', bolt: 48, mark: 88 },
} as const;

/**
 * The brand bolt. Custom-drawn lightning — chunky, slight forward slant,
 * single fill. Renders inline so it can replace the dot of the `i`.
 */
function Bolt({
  size = 22,
  className = '',
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d="M14.2 2.2 L5.4 13.6 L11.2 13.6 L9.8 21.8 L18.6 10.4 L12.8 10.4 L14.2 2.2 Z" />
    </svg>
  );
}

export default function Logo({
  variant,
  size = 'md',
  className = '',
  onLight = false,
  showWordmark,
}: LogoProps) {
  // Resolve variant: explicit `variant` wins. Else derive from the
  // legacy `showWordmark` (true → wordmark, false → mark). Default
  // to wordmark.
  const v: 'wordmark' | 'mark' | 'inline' =
    variant ?? (showWordmark === false ? 'mark' : 'wordmark');

  const s = SIZES[size];

  const textClass = onLight ? 'text-ink' : 'text-bone';
  const subtitleClass = 'text-mute';

  if (v === 'mark') {
    // Square-tile mark for app icons, Discord avatars, favicons.
    const px = s.mark;
    return (
      <div
        className={`inline-flex items-center justify-center rounded-xl bg-ink ${className}`}
        style={{ width: px, height: px }}
        aria-label="Inspire Development"
      >
        <Bolt size={Math.round(px * 0.55)} className="text-flame" />
      </div>
    );
  }

  if (v === 'inline') {
    return (
      <div className={`inline-flex items-baseline gap-1 font-display font-bold ${className}`}>
        <span className={`${s.wordmark} tracking-tight ${textClass}`}>
          insp
          <span className="relative inline-block" style={{ width: '0.5em' }}>
            <span aria-hidden="true">i</span>
            <Bolt
              size={s.bolt}
              className="absolute left-1/2 -translate-x-1/2 text-flame"
              style={{ top: `-${s.bolt * 0.4}px` }}
            />
          </span>
          re
        </span>
        <span className={`text-base font-medium ${subtitleClass}`}>Development</span>
      </div>
    );
  }

  // Default: stacked wordmark for header/nav use.
  return (
    <div
      className={`inline-flex flex-col leading-none ${className}`}
      aria-label="Inspire Development"
    >
      <span className={`font-display font-bold ${s.wordmark} tracking-tight ${textClass}`}>
        insp
        <span className="relative inline-block" style={{ width: '0.5em' }}>
          <span aria-hidden="true">i</span>
          <Bolt
            size={s.bolt}
            className="absolute left-1/2 -translate-x-1/2 text-flame"
            style={{ top: `-${s.bolt * 0.4}px` }}
          />
        </span>
        re
      </span>
      <span
        className={`font-sans font-medium uppercase ${s.subtitle} tracking-[0.25em] mt-0.5 ${subtitleClass}`}
      >
        Development
      </span>
    </div>
  );
}
