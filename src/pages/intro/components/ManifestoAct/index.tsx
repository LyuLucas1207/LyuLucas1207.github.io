import type { RefObject } from 'react'
import type { Nullable } from 'nfx-ui/types'

import { gsap, useGSAP } from '@/animations/gsap'
import { SlantGridBackdrop } from '@/components/SlantGridBackdrop'
import { useReducedMotion } from '@/hooks'

import type { IntroManifestoBlock } from '../../mock'
import type { IntroScrollPhase } from '../../types'
import { ManifestoPanel } from './ManifestoPanel'
import styles from './styles.module.css'

type ManifestoActProps = {
  sectionRef: RefObject<Nullable<HTMLElement>>
  stageRef: RefObject<Nullable<HTMLDivElement>>
  blocks: IntroManifestoBlock[]
  scrollPhase: IntroScrollPhase
}

function ManifestoAct({ sectionRef, stageRef, blocks, scrollPhase }: ManifestoActProps) {
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = stageRef.current
      if (!el || reduced) return

      const mm = gsap.matchMedia()

      mm.add('(max-width: 860px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-manifesto-slide]', el).forEach((slide) => {
          gsap.from(slide, {
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: slide, start: 'top 90%', once: true },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: stageRef, dependencies: [reduced, blocks.length], revertOnUpdate: true },
  )

  const waiting = scrollPhase < 1

  return (
    <section
      ref={sectionRef}
      className={styles.manifesto}
      data-intro-act="manifesto"
      data-intro-phase={scrollPhase}
      data-intro-waiting={waiting || undefined}
      aria-hidden={waiting || undefined}
    >
      <SlantGridBackdrop className={styles.manifestoGrid} />
      <p className={styles.manifestoLabel}>Pilot&apos;s manifesto</p>

      <div ref={stageRef} className={styles.manifestoStage}>
        {blocks.map((block, index) => {
          const flip = index % 2 === 1

          return (
            <article
              key={block.id}
              className={`${styles.manifestoSlide} ${flip ? styles.manifestoSlideFlip : ''}`}
              data-manifesto-slide
            >
              <div className={styles.manifestoTextCol} data-manifesto-text-col>
                {block.paragraphs.map((paragraph, i) => (
                  <p key={i} className={styles.manifestoText} data-manifesto-text>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className={styles.manifestoVisual} data-manifesto-visual aria-hidden>
                <ManifestoPanel index={index} />
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export { ManifestoAct }
