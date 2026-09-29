import styles from './styles.module.css'

type FieldGridBackdropProps = {
  className?: string
}

/** Dot grid — masked from transparent (top-right) to visible (bottom-left). */
function FieldGridBackdrop({ className }: FieldGridBackdropProps) {
  const cols = 16
  const rows = 12
  const step = 52
  const width = cols * step
  const height = rows * step

  return (
    <div className={`${styles.root} ${className ?? ''}`.trim()} data-field-grid aria-hidden>
      <div className={styles.shift} data-field-shift>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: rows + 1 }).map((_, row) => (
            <line
              key={`h-${row}`}
              x1={0}
              y1={row * step}
              x2={width}
              y2={row * step}
              className={styles.line}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {Array.from({ length: cols + 1 }).map((_, col) => (
            <line
              key={`v-${col}`}
              x1={col * step}
              y1={0}
              x2={col * step}
              y2={height}
              className={styles.line}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {Array.from({ length: rows + 1 }).flatMap((_, row) =>
            Array.from({ length: cols + 1 }).map((__, col) => (
              <circle
                key={`d-${row}-${col}`}
                cx={col * step}
                cy={row * step}
                r={1.6}
                className={styles.dot}
                vectorEffect="non-scaling-stroke"
              />
            )),
          )}
        </svg>
      </div>
    </div>
  )
}

export { FieldGridBackdrop }
