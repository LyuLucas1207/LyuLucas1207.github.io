type ManifestoPanelProps = {
  index: number
}

/** Line-art instrument panels — alternate with text rows. */
function ManifestoPanel({ index }: ManifestoPanelProps) {
  const variant = index % 4

  if (variant === 0) {
    return (
      <svg viewBox="0 0 280 200" fill="none" aria-hidden>
        <rect x="1" y="1" width="278" height="198" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={i} x1="16" y1={36 + i * 32} x2="264" y2={36 + i * 32} stroke="currentColor" strokeWidth="0.35" opacity="0.25" />
        ))}
        <path
          data-log-trajectory
          d="M 24 168 C 72 120, 120 88, 180 64 S 240 36, 256 28"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.55"
        />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={24 + i * 58} cy={168 - i * 38} r="2.5" fill="currentColor" data-log-node />
        ))}
        <text x="16" y="24" fill="currentColor" fontSize="8" letterSpacing="2" opacity="0.6">
          FLIGHT LOG
        </text>
      </svg>
    )
  }

  if (variant === 1) {
    return (
      <svg viewBox="0 0 280 200" fill="none" aria-hidden>
        <circle cx="140" cy="100" r="72" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
        <circle cx="140" cy="100" r="48" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
        <line x1="140" y1="28" x2="140" y2="172" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        <line x1="68" y1="100" x2="212" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        <g data-log-compass-needle>
          <path d="M 140 42 L 148 100 L 140 158 L 132 100 Z" fill="currentColor" opacity="0.5" />
        </g>
        <text x="140" y="188" textAnchor="middle" fill="currentColor" fontSize="8" letterSpacing="2" opacity="0.55">
          49.28°N · HEADING 247°
        </text>
      </svg>
    )
  }

  if (variant === 2) {
    return (
      <svg viewBox="0 0 280 200" fill="none" aria-hidden>
        <rect x="20" y="24" width="72" height="48" stroke="currentColor" strokeWidth="0.55" opacity="0.45" />
        <rect x="108" y="24" width="72" height="48" stroke="currentColor" strokeWidth="0.55" opacity="0.45" />
        <rect x="196" y="24" width="64" height="48" stroke="currentColor" strokeWidth="0.55" opacity="0.45" />
        <rect x="20" y="88" width="112" height="56" stroke="currentColor" strokeWidth="0.55" opacity="0.45" />
        <rect x="148" y="88" width="112" height="56" stroke="currentColor" strokeWidth="0.55" opacity="0.45" />
        <line x1="56" y1="152" x2="224" y2="152" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
        <line x1="56" y1="152" x2="96" y2="176" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
        <line x1="224" y1="152" x2="184" y2="176" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
        <text x="20" y="16" fill="currentColor" fontSize="8" letterSpacing="2" opacity="0.55">
          SYSTEM MAP
        </text>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 280 200" fill="none" aria-hidden>
      <line x1="24" y1="176" x2="256" y2="176" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <line x1={24 + i * 46} y1="176" x2={24 + i * 46} y2={148 - (i % 3) * 28} stroke="currentColor" strokeWidth="0.55" opacity="0.45" />
          <circle cx={24 + i * 46} cy={148 - (i % 3) * 28} r="3" fill="currentColor" opacity="0.55" />
        </g>
      ))}
      <text x="24" y="24" fill="currentColor" fontSize="8" letterSpacing="2" opacity="0.55">
        ALTITUDE TRACE
      </text>
    </svg>
  )
}

export { ManifestoPanel }
