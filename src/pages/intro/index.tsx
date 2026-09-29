import { useCallback, useRef, useState } from 'react'
import type { Nullable } from 'nfx-ui/types'

import { gsap, useGSAP } from '@/animations/gsap'
import { routerEventEmitter } from '@/events/router'
import { useReducedMotion } from '@/hooks'
import { ROUTES } from '@/navigations/routes'
import { playWorldTransition } from '@/stores/transitionStore'

import { ClosingAct } from './components/ClosingAct'
import { HeroAct } from './components/HeroAct'
import { JourneyAct } from './components/JourneyAct'
import { ManifestoAct } from './components/ManifestoAct'
import { WallAct } from './components/WallAct'
import { useIntroDesktopScroll } from './hooks/useIntroDesktopScroll'
import {
  INTRO_CLOSING,
  INTRO_HERO,
  INTRO_JOURNEY,
  INTRO_MANIFESTO,
  INTRO_WALL,
} from './mock'
import type { IntroScrollPhase } from './types'

import styles from './styles.module.css'

function IntroPage() {
  const rootRef = useRef<Nullable<HTMLDivElement>>(null)
  const wallRef = useRef<Nullable<HTMLElement>>(null)
  const trackRef = useRef<Nullable<HTMLDivElement>>(null)
  const manifestoRef = useRef<Nullable<HTMLElement>>(null)
  const manifestoStageRef = useRef<Nullable<HTMLDivElement>>(null)
  const journeyRef = useRef<Nullable<HTMLElement>>(null)
  const journeyCanvasRef = useRef<Nullable<HTMLDivElement>>(null)
  const reduced = useReducedMotion()

  const [scrollPhase, setScrollPhase] = useState<IntroScrollPhase>(0)

  const handlePhaseChange = useCallback((phase: IntroScrollPhase) => {
    setScrollPhase(phase)
  }, [])

  useIntroDesktopScroll({
    rootRef,
    wallRef,
    trackRef,
    manifestoRef,
    manifestoStageRef,
    journeyRef,
    journeyCanvasRef,
    reduced,
    onPhaseChange: handlePhaseChange,
  })

  useGSAP(
    () => {
      if (reduced) return

      gsap.from('[data-hero-rule]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.3,
        ease: 'power3.inOut',
        stagger: 0.12,
      })
      gsap.from('[data-hero-fade]', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        delay: 0.6,
        ease: 'power3.out',
        stagger: 0.09,
      })
      gsap.to('[data-hint-arrow]', {
        y: 8,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      const mm = gsap.matchMedia()

      mm.add('(max-width: 860px)', () => {
        gsap.utils
          .toArray<HTMLElement>('[data-wall-panel], [data-journey-stop]')
          .forEach((item) => {
            gsap.from(item, {
              opacity: 0,
              y: 44,
              duration: 0.9,
              ease: 'power4.out',
              scrollTrigger: { trigger: item, start: 'top 90%', once: true },
            })
          })
      })

      return () => mm.revert()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  const openChannel = () => {
    playWorldTransition({
      type: 'page',
      page: ROUTES.CONTACT,
      title: INTRO_CLOSING.cta,
      subtitle: INTRO_HERO.eyebrow,
      action: () => routerEventEmitter.navigate({ to: ROUTES.CONTACT }),
    })
  }

  return (
    <div
      ref={rootRef}
      className={styles.page}
      data-intro-scroll-phase={scrollPhase}
    >
      <HeroAct />
      <WallAct
        wallRef={wallRef}
        trackRef={trackRef}
        items={INTRO_WALL}
        scrollPhase={scrollPhase}
      />
      <ManifestoAct
        sectionRef={manifestoRef}
        stageRef={manifestoStageRef}
        blocks={INTRO_MANIFESTO}
        scrollPhase={scrollPhase}
      />
      <JourneyAct
        stageRef={journeyRef}
        canvasRef={journeyCanvasRef}
        stops={INTRO_JOURNEY}
        scrollPhase={scrollPhase}
      />
      <ClosingAct onOpenChannel={openChannel} />
    </div>
  )
}

export { IntroPage }
