/**
 * Flat diamond pointer — long median = flight axis (+X), short median = wing span.
 */
function PaperPlaneSvg() {
  return (
    <svg
      viewBox="0 0 100 64"
      className="paper-plane-svg"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        className="plane-outline"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M94 32 L52 14 L22 32 L52 50 Z" />
      </g>
      <path
        data-plane-crease
        d="M22 32 L94 32"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeOpacity="0.42"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export { PaperPlaneSvg }
