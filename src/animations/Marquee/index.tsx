import type { ReactNode } from 'react'
import { useRef } from 'react'

import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks'

import styles from './styles.module.css'

type MarqueeProps = {
  children: ReactNode
  className?: string
  duration?: number
  reverse?: boolean
}

function Marquee({
  children,
  className,
  duration = 26,
  reverse = false,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const track = trackRef.current
      if (!track || reduced) return

      gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration, ease: 'none', repeat: -1 },
      )
    },
    { dependencies: [duration, reverse, reduced] },
  )

  return (
    <div className={`${styles.marquee} ${className ?? ''}`} aria-hidden>
      <div ref={trackRef} className={styles.track}>
        <div className={styles.group}>{children}</div>
        <div className={styles.group}>{children}</div>
      </div>
    </div>
  )
}

export { Marquee }
