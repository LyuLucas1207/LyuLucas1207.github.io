import type { CSSProperties, RefObject } from 'react'
import type { Nullable } from 'nfx-ui/types'

import type { IntroJourneyStop } from '../../mock'
import type { IntroScrollPhase } from '../../types'
import styles from '../../styles.module.css'

type JourneyActProps = {
  stageRef: RefObject<Nullable<HTMLElement>>
  canvasRef: RefObject<Nullable<HTMLDivElement>>
  stops: IntroJourneyStop[]
  scrollPhase: IntroScrollPhase
}

/** Even spacing along bottom-left → top-right diagonal inside the pin canvas. */
function stopOnDiagonal(index: number, total: number) {
  if (total <= 1) return { left: '50%', top: '50%' }
  const t = index / (total - 1)
  return {
    left: `${6 + t * 88}%`,
    top: `${94 - t * 88}%`,
  }
}

function JourneyAct({ stageRef, canvasRef, stops, scrollPhase }: JourneyActProps) {
  const waiting = scrollPhase < 2

  const canvasStyle = {
    '--journey-count': stops.length,
  } as CSSProperties

  return (
    <section
      ref={stageRef}
      className={styles.stage}
      data-intro-act="journey"
      data-intro-phase={scrollPhase}
      data-intro-waiting={waiting || undefined}
      aria-hidden={waiting || undefined}
    >
      <div className={styles.stageLabel}>
        <p>Trajectory — 2017 → 2027</p>
      </div>

      <svg className={styles.stageBackdrop} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={8 + i * 12}
            x2="100"
            y2={8 + i * 12}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={10 + i * 16}
            y1="0"
            x2={10 + i * 16}
            y2="100"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <div ref={canvasRef} className={styles.stageCanvas} style={canvasStyle}>
        <div className={styles.stageHatch} aria-hidden />

        <svg className={styles.stageDiagonal} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {Array.from({ length: 16 }).map((_, i) => {
            const k = 14 + i * 11
            const x1 = Math.max(0, k - 100)
            const y1 = Math.min(100, k)
            const x2 = Math.min(100, k)
            const y2 = Math.max(0, k - 100)
            const isSpine = i === 7 || i === 8

            return (
              <line
                key={`diag-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                vectorEffect="non-scaling-stroke"
                data-spine={isSpine || undefined}
              />
            )
          })}
        </svg>

        {stops.map((stop, index) => {
          const pos = stopOnDiagonal(index, stops.length)

          return (
            <article
              key={stop.id}
              className={styles.journeyStop}
              data-journey-stop
              style={{ left: pos.left, top: pos.top }}
            >
              <p className={styles.journeyPeriod}>{stop.period}</p>
              <h3 className={styles.journeyTitle}>{stop.title}</h3>
              <p className={styles.journeyDetail}>{stop.detail}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export { JourneyAct }
