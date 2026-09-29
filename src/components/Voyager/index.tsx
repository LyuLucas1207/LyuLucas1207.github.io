import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import type { Nullable } from 'nfx-ui/types'

import { gsap, ScrollTrigger, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks'

import { setupProgressVoyagerFlight } from './progressFlight'
import { PaperPlaneSvg } from './PaperPlaneSvg'
import styles from './styles.module.css'

/**
 * Site-wide paper plane — follows the NavBar scroll progress hairline.
 * Each route gets a random top start / bottom end and a winding horizontal path.
 */
function Voyager() {
  const layerRef = useRef<Nullable<HTMLDivElement>>(null)
  const reduced = useReducedMotion()
  const { pathname } = useLocation()

  useGSAP(
    () => {
      const layer = layerRef.current
      if (!layer || reduced) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 861px)', () => {
        const plane = layer.querySelector<HTMLElement>('[data-plane]')
        const body = layer.querySelector<HTMLElement>('[data-plane-body]')
        const crease = layer.querySelector<HTMLElement>('[data-plane-crease]')
        if (!plane || !body) return

        gsap.set(body, { scale: 1, z: 0, filter: 'blur(0px)', opacity: 1, rotationX: 0, rotationY: 0 })

        const creaseTween = crease
          ? gsap.to(crease, {
              strokeOpacity: 0.15,
              duration: 0.35,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            })
          : null

        const teardown = setupProgressVoyagerFlight(plane, body, pathname)

        ScrollTrigger.refresh()

        return () => {
          teardown()
          creaseTween?.kill()
        }
      })

      return () => mm.revert()
    },
    { scope: layerRef, dependencies: [reduced, pathname] },
  )

  useEffect(() => {
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => window.cancelAnimationFrame(id)
  }, [pathname])

  if (reduced) return null

  return (
    <div ref={layerRef} className={styles.layer} aria-hidden>
      <div className={styles.perspective}>
        <div className={styles.plane} data-plane>
          <div className={styles.planeBody} data-plane-body>
            <span className={styles.trail} />
            <PaperPlaneSvg />
          </div>
        </div>
      </div>
    </div>
  )
}

export { Voyager }
