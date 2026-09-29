import { forwardRef } from 'react'
import type { Nullable } from 'nfx-ui/types'

import styles from './styles.module.css'

const CX = 400
const CY = 300

/** Closed ellipse path centered at origin (two 180° arcs). */
function orbitPath(rx: number, ry: number) {
  return `M ${rx} 0 A ${rx} ${ry} 0 1 1 ${-rx} 0 A ${rx} ${ry} 0 1 1 ${rx} 0`
}

/** Negative begin offsets initial position along the path (phase in degrees). */
function motionBegin(phaseDeg: number, durSec: number) {
  const normalized = ((phaseDeg % 360) + 360) % 360
  return `-${(normalized / 360) * durSec}s`
}

/** Tilted ellipses — different planes interleave for a flat 3D illusion. */
const ORBITS = [
  { rx: 168, ry: 54, tilt: -38, dur: 52, phase: 0, hollow: false },
  { rx: 142, ry: 46, tilt: 24, dur: 44, phase: 72, hollow: true },
  { rx: 192, ry: 62, tilt: 68, dur: 64, phase: 148, hollow: false },
  { rx: 124, ry: 40, tilt: -72, dur: 38, phase: -55, hollow: true },
  { rx: 210, ry: 58, tilt: 12, dur: 70, phase: 210, hollow: false },
]

const ProjectsOrbitStage = forwardRef<Nullable<HTMLDivElement>>(function ProjectsOrbitStage(_, ref) {
  return (
    <div ref={ref} className={styles.stage} data-projects-orbit aria-hidden>
      <svg className={styles.svg} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
        <g className={styles.field}>
          {[
            [72, 88],
            [168, 52],
            [640, 76],
            [710, 168],
            [118, 480],
            [280, 520],
            [560, 500],
            [680, 420],
          ].map(([x, y], i) => (
            <circle key={`dust-${i}`} cx={x} cy={y} r={1.1} className={styles.dust} />
          ))}

          {ORBITS.map((orbit, i) => (
            <g key={`plane-${i}`} transform={`rotate(${orbit.tilt} ${CX} ${CY})`}>
              <ellipse cx={CX} cy={CY} rx={orbit.rx} ry={orbit.ry} className={styles.ring} />
              <g transform={`translate(${CX} ${CY})`}>
                <circle
                  r={orbit.hollow ? 4.5 : 5}
                  className={orbit.hollow ? styles.moon : styles.planet}
                >
                  <animateMotion
                    dur={`${orbit.dur}s`}
                    repeatCount="indefinite"
                    begin={motionBegin(orbit.phase, orbit.dur)}
                    path={orbitPath(orbit.rx, orbit.ry)}
                  />
                </circle>
              </g>
            </g>
          ))}

          <circle cx={CX} cy={CY} r={22} className={styles.coreRing} data-orbit-core />
          <circle cx={CX} cy={CY} r={7} className={styles.core} />
        </g>
      </svg>
    </div>
  )
})

export { ProjectsOrbitStage }
