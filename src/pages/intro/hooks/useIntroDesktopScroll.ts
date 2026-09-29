import { useRef } from 'react'
import type { RefObject } from 'react'
import type { Nullable } from 'nfx-ui/types'

import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/animations/gsap'

import type { IntroScrollPhase } from '../types'
import {
  getJourneyScrollDistance,
  getManifestoScrollDistance,
  getWallScrollDistance,
  MANIFESTO_EXIT,
  MANIFESTO_SEG,
  MANIFESTO_TEXT_IN,
  MANIFESTO_VISUAL_IN,
  MANIFESTO_WORDS_IN,
} from '../scrollMetrics'

type UseIntroDesktopScrollOptions = {
  rootRef: RefObject<Nullable<HTMLDivElement>>
  wallRef: RefObject<Nullable<HTMLElement>>
  trackRef: RefObject<Nullable<HTMLDivElement>>
  manifestoRef: RefObject<Nullable<HTMLElement>>
  manifestoStageRef: RefObject<Nullable<HTMLDivElement>>
  journeyRef: RefObject<Nullable<HTMLElement>>
  journeyCanvasRef: RefObject<Nullable<HTMLDivElement>>
  reduced: boolean
  onPhaseChange: (phase: IntroScrollPhase) => void
}

function useIntroDesktopScroll({
  rootRef,
  wallRef,
  trackRef,
  manifestoRef,
  manifestoStageRef,
  journeyRef,
  journeyCanvasRef,
  reduced,
  onPhaseChange,
}: UseIntroDesktopScrollOptions) {
  const onPhaseChangeRef = useRef(onPhaseChange)
  onPhaseChangeRef.current = onPhaseChange

  useGSAP(
    () => {
      if (reduced) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 861px)', () => {
        const wall = wallRef.current
        const track = trackRef.current
        const manifesto = manifestoRef.current
        const manifestoStage = manifestoStageRef.current
        const journey = journeyRef.current
        const canvas = journeyCanvasRef.current

        if (!wall || !track || !manifesto || !manifestoStage || !journey || !canvas) return

        const setPhase = (phase: IntroScrollPhase) => onPhaseChangeRef.current(phase)

        const wallDist = () => getWallScrollDistance(track)

        /* ── phase 0 · horizontal wall (must finish before manifesto) ── */
        const wallTween = gsap.to(track, {
          x: () => -wallDist(),
          ease: 'none',
          scrollTrigger: {
            id: 'intro-wall',
            trigger: wall,
            start: 'top top',
            end: () => `+=${wallDist()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onEnter: () => setPhase(0),
            onEnterBack: () => setPhase(0),
            onLeave: () => setPhase(1),
            onLeaveBack: () => setPhase(0),
          },
        })

        gsap.fromTo(
          '[data-wall-progress]',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: wall,
              start: 'top top',
              end: () => `+=${wallDist()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        )

        gsap.utils.toArray<HTMLElement>('[data-wall-num]', track).forEach((num) => {
          gsap.fromTo(
            num,
            { xPercent: 26 },
            {
              xPercent: -26,
              ease: 'none',
              scrollTrigger: {
                trigger: num,
                containerAnimation: wallTween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })

        gsap.utils.toArray<HTMLElement>('[data-field-shift]', track).forEach((layer) => {
          const panel = layer.closest('[data-wall-panel]')
          if (!panel) return

          gsap.fromTo(
            layer,
            { yPercent: 12 },
            {
              yPercent: -36,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: wallTween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })

        /* ── phase 1 · manifesto (starts only after wall pin releases) ── */
        const splits: SplitText[] = []
        const slides = gsap.utils.toArray<HTMLElement>('[data-manifesto-slide]', manifestoStage)
        const slideWords: HTMLElement[][] = []

        slides.forEach((slide, index) => {
          const flip = index % 2 === 1
          const textEnter = flip ? '110%' : '-110%'
          const textExit = flip ? '110%' : '-110%'
          const visualEnter = flip ? '-110%' : '110%'
          const visualExit = flip ? '-110%' : '110%'

          const textCol = slide.querySelector<HTMLElement>('[data-manifesto-text-col]')
          const visual = slide.querySelector<HTMLElement>('[data-manifesto-visual]')

          const words: HTMLElement[] = []
          gsap.utils.toArray<HTMLElement>('[data-manifesto-text]', slide).forEach((para) => {
            const split = SplitText.create(para, { type: 'words', autoSplit: true })
            splits.push(split)
            words.push(...(split.words as HTMLElement[]))
          })
          slideWords.push(words)

          if (index === 0) {
            gsap.set(words, { opacity: 0.12, y: 8 })
            gsap.set([textCol, visual].filter(Boolean), { x: '0%', opacity: 1 })
          } else {
            gsap.set(words, { opacity: 0, y: 8 })
            if (textCol) gsap.set(textCol, { x: textEnter, opacity: 0 })
            if (visual) gsap.set(visual, { x: visualEnter, opacity: 0 })
          }

          slide.dataset.textEnter = textEnter
          slide.dataset.textExit = textExit
          slide.dataset.visualEnter = visualEnter
          slide.dataset.visualExit = visualExit
        })

        gsap.set(slides, { autoAlpha: 0, zIndex: 0 })
        gsap.set(slides[0], { autoAlpha: 1, zIndex: 2 })

        const manifestoTl = gsap.timeline({
          scrollTrigger: {
            id: 'intro-manifesto',
            trigger: manifesto,
            start: 'top top',
            end: () => `+=${getManifestoScrollDistance(slides.length)}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onEnter: () => setPhase(1),
            onEnterBack: () => setPhase(1),
            onLeave: () => setPhase(2),
            onLeaveBack: () => setPhase(1),
          },
        })

        const slantGrid = manifesto.querySelector<HTMLElement>('[data-slant-grid-track]')
        if (slantGrid) {
          gsap.fromTo(
            slantGrid,
            { xPercent: 0, yPercent: 8 },
            {
              xPercent: -38,
              yPercent: -22,
              ease: 'none',
              scrollTrigger: {
                trigger: manifesto,
                start: 'top top',
                end: () => `+=${getManifestoScrollDistance(slides.length)}`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          )
        }

        slides.forEach((slide, index) => {
          const textCol = slide.querySelector<HTMLElement>('[data-manifesto-text-col]')
          const visual = slide.querySelector<HTMLElement>('[data-manifesto-visual]')
          const trajectory = slide.querySelector('[data-log-trajectory]')
          const words = slideWords[index]
          const start = index * MANIFESTO_SEG

          const textEnter = slide.dataset.textEnter ?? '-110%'
          const textExit = slide.dataset.textExit ?? '-110%'
          const visualEnter = slide.dataset.visualEnter ?? '110%'
          const visualExit = slide.dataset.visualExit ?? '110%'

          if (index > 0) {
            manifestoTl.set(slide, { autoAlpha: 1, zIndex: 2 }, start)

            if (visual) {
              manifestoTl.fromTo(
                visual,
                { x: visualEnter, opacity: 0 },
                { x: '0%', opacity: 1, duration: MANIFESTO_VISUAL_IN, ease: 'power3.out' },
                start,
              )
            }

            if (trajectory) {
              manifestoTl.fromTo(
                trajectory,
                { drawSVG: '0%' },
                { drawSVG: '100%', duration: MANIFESTO_VISUAL_IN * 0.85, ease: 'none' },
                start + 0.04,
              )
            }

            if (textCol) {
              manifestoTl.fromTo(
                textCol,
                { x: textEnter, opacity: 0 },
                { x: '0%', opacity: 1, duration: MANIFESTO_TEXT_IN, ease: 'power3.out' },
                start + MANIFESTO_VISUAL_IN,
              )
            }
          } else if (trajectory) {
            manifestoTl.fromTo(
              trajectory,
              { drawSVG: '0%' },
              { drawSVG: '100%', duration: MANIFESTO_VISUAL_IN, ease: 'none' },
              start + 0.04,
            )
          }

          const wordsAt = index > 0 ? start + MANIFESTO_VISUAL_IN + MANIFESTO_TEXT_IN : start + 0.04
          if (words.length > 0) {
            manifestoTl.to(
              words,
              {
                opacity: 1,
                y: 0,
                duration: MANIFESTO_WORDS_IN,
                ease: 'none',
                stagger: { each: MANIFESTO_WORDS_IN / words.length, ease: 'none' },
              },
              wordsAt,
            )
          }

          if (index < slides.length - 1) {
            const exitAt = start + MANIFESTO_VISUAL_IN + MANIFESTO_TEXT_IN + MANIFESTO_WORDS_IN
            if (textCol) {
              manifestoTl.to(
                textCol,
                { x: textExit, opacity: 0, duration: MANIFESTO_EXIT, ease: 'power3.in' },
                exitAt,
              )
            }
            if (visual) {
              manifestoTl.to(
                visual,
                { x: visualExit, opacity: 0, duration: MANIFESTO_EXIT, ease: 'power3.in' },
                exitAt,
              )
            }
            manifestoTl.set(slide, { autoAlpha: 0, zIndex: 0 }, exitAt + MANIFESTO_EXIT)
            manifestoTl.set(words, { opacity: index === 0 ? 0.12 : 0, y: 8 }, exitAt + MANIFESTO_EXIT)
          }
        })

        const needle = manifesto.querySelector('[data-log-compass-needle]')
        if (needle) {
          gsap.to(needle, {
            rotation: 360,
            duration: 24,
            repeat: -1,
            ease: 'none',
            transformOrigin: '50% 50%',
          })
        }

        /* ── phase 2 · journey diagonal (only after manifesto pin releases) ── */
        const journeyPan = () => {
          const travel = getJourneyScrollDistance(canvas)
          const dx = Math.max(0, canvas.offsetWidth - window.innerWidth)
          const dy = Math.max(0, canvas.offsetHeight - window.innerHeight)
          return { dx, dy, travel }
        }

        gsap.set(canvas, { x: 0, y: () => -journeyPan().dy })

        gsap.fromTo(
          canvas,
          { x: 0, y: () => -journeyPan().dy },
          {
            x: () => -journeyPan().dx,
            y: 0,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              id: 'intro-journey',
              trigger: journey,
              start: 'top top',
              end: () => `+=${journeyPan().travel}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onEnter: () => setPhase(2),
              onEnterBack: () => setPhase(2),
              onLeave: () => setPhase(3),
              onLeaveBack: () => setPhase(2),
            },
          },
        )

        ScrollTrigger.refresh()
        window.dispatchEvent(new CustomEvent('intro-scroll-ready'))

        return () => {
          splits.forEach((split) => split.revert())
        }
      })

      return () => mm.revert()
    },
    {
      scope: rootRef,
      dependencies: [reduced],
      revertOnUpdate: true,
    },
  )
}

export { useIntroDesktopScroll }
