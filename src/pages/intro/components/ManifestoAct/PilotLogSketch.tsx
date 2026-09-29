/** Right-rail instrument panel — line-art flight log (fills manifesto dead space). */
function PilotLogSketch() {
  return (
    <svg
      className="pilot-log-sketch"
      viewBox="0 0 320 420"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="318"
        height="418"
        className="log-frame"
        strokeWidth="0.8"
      />
      <line x1="1" y1="48" x2="319" y2="48" className="log-line" strokeWidth="0.6" />
      <text x="16" y="32" className="log-caption">
        FLIGHT LOG · VAN SECTOR
      </text>

      {/* trajectory arc */}
      <path
        d="M 24 360 C 80 280, 120 200, 180 140 S 260 80, 296 52"
        className="log-trajectory"
        data-log-trajectory
        strokeWidth="1"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={24 + i * 68}
          cy={360 - i * 52}
          r="2.5"
          className="log-node"
          data-log-node
        />
      ))}

      {/* coordinate grid */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="16"
          y1={64 + i * 56}
          x2="304"
          y2={64 + i * 56}
          className="log-grid"
          strokeWidth="0.4"
        />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={64 + i * 56}
          y1="64"
          x2={64 + i * 56}
          y2="400"
          className="log-grid"
          strokeWidth="0.4"
        />
      ))}

      {/* compass rose — sketch */}
      <g transform="translate(248 320)">
        <circle r="36" className="log-compass-ring" strokeWidth="0.7" />
        <line x1="0" y1="-28" x2="0" y2="28" className="log-compass" strokeWidth="0.6" />
        <line x1="-28" y1="0" x2="28" y2="0" className="log-compass" strokeWidth="0.6" />
        <g data-log-compass-needle>
          <path d="M 0 -22 L 4 0 L 0 22 L -4 0 Z" className="log-compass-needle" strokeWidth="0.8" />
        </g>
        <text y="48" textAnchor="middle" className="log-caption">
          49.28°N
        </text>
      </g>

      {/* star ticks — right margin */}
      {[
        [280, 88],
        [300, 120],
        [292, 168],
        [308, 210],
        [285, 252],
      ].map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx} ${cy})`} data-log-star>
          <line x1="-4" y1="0" x2="4" y2="0" className="log-star" strokeWidth="0.5" />
          <line x1="0" y1="-4" x2="0" y2="4" className="log-star" strokeWidth="0.5" />
        </g>
      ))}

      <text x="16" y="392" className="log-caption">
        ALT 124m · HEADING 247°
      </text>
    </svg>
  )
}

export { PilotLogSketch }
