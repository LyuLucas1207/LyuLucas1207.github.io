import styles from './styles.module.css'

type SlantGridBackdropProps = {
  className?: string
}

/** Diagonal dot grid — wide track for horizontal drift on scroll. */
function SlantGridBackdrop({ className }: SlantGridBackdropProps) {
  const w = 2800
  const h = 1600
  const step = 54
  const cols = Math.ceil(w / step) + 2
  const rows = Math.ceil(h / step) + 2
  const cx = w / 2
  const cy = h / 2
  const angle = -28

  return (
    <div className={`${styles.root} ${className ?? ''}`.trim()} data-slant-grid aria-hidden>
      <div className={styles.track} data-slant-grid-track>
        <svg className={styles.svg} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice">
          <g transform={`rotate(${angle} ${cx} ${cy})`}>
            {Array.from({ length: rows }).map((_, row) => (
              <line
                key={`h-${row}`}
                x1={-step}
                y1={row * step}
                x2={w + step}
                y2={row * step}
                className={styles.line}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {Array.from({ length: cols }).map((_, col) => (
              <line
                key={`v-${col}`}
                x1={col * step}
                y1={-step}
                x2={col * step}
                y2={h + step}
                className={styles.line}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {Array.from({ length: rows }).flatMap((_, row) =>
              Array.from({ length: cols }).map((__, col) => (
                <circle
                  key={`d-${row}-${col}`}
                  cx={col * step}
                  cy={row * step}
                  r={1.5}
                  className={styles.dot}
                  vectorEffect="non-scaling-stroke"
                />
              )),
            )}
          </g>
        </svg>
      </div>
    </div>
  )
}

export { SlantGridBackdrop }
