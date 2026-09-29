import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { Nullable } from 'nfx-ui/types'

import { gsap, ScrollTrigger, useGSAP } from '@/animations/gsap'
import { FlickerGlow, Scramble, SplitReveal } from '@/animations'
import { IconChip } from '@/components/IconChip'
import { highlightIconMap } from '@/constants/siteContent'
import { useHighlightsQuery, useReducedMotion, useTimelineQuery } from '@/hooks'

import { HighlightsObservatoryHero } from './components/HighlightsObservatoryHero'
import { HonorRail } from './components/HonorRail'
import { HONOR_RAIL } from './mock'

import styles from './styles.module.css'

function HighlightsPage() {
  const { t } = useTranslation(['components', 'HighlightsPage'])
  const { data: highlights = [] } = useHighlightsQuery()
  const { data: timeline = [] } = useTimelineQuery()
  const stackRef = useRef<Nullable<HTMLDivElement>>(null)
  const arcRef = useRef<Nullable<HTMLElement>>(null)
  const honorRef = useRef<Nullable<HTMLElement>>(null)
  const honorTrackRef = useRef<Nullable<HTMLDivElement>>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const rail = honorRef.current
      const track = honorTrackRef.current
      if (!rail || !track || reduced) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 861px)', () => {
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 80)

        gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: rail,
            start: 'top 75%',
            end: () => `+=${dist() + 200}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      })

      mm.add('(max-width: 860px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-honor-panel]', track).forEach((panel) => {
          gsap.from(panel, {
            opacity: 0,
            x: 32,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 92%', once: true },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: honorRef, dependencies: [reduced] },
  )

  useGSAP(
    () => {
      const node = stackRef.current
      if (!node || reduced || highlights.length === 0) return

      const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]', node)

      cards.forEach((card, index) => {
        const next = cards[index + 1]
        if (!next) return

        gsap.to(card, {
          scale: 0.92,
          opacity: 0.55,
          ease: 'none',
          scrollTrigger: {
            trigger: next,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          },
        })
      })

      ScrollTrigger.refresh()
    },
    { scope: stackRef, dependencies: [reduced, highlights.length] },
  )

  useGSAP(
    () => {
      const node = arcRef.current
      if (!node || reduced || timeline.length === 0) return

      gsap.fromTo(
        node.querySelector('[data-arc-line]'),
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: node,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: true,
          },
        },
      )

      node.querySelectorAll('[data-arc-row]').forEach((row) => {
        gsap.from(row.querySelectorAll('[data-arc-item]'), {
          opacity: 0,
          y: 34,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.07,
          scrollTrigger: { trigger: row, start: 'top 85%', once: true },
        })
      })

      ScrollTrigger.refresh()
    },
    { scope: arcRef, dependencies: [reduced, timeline.length] },
  )

  return (
    <div className={styles.page}>
      <HighlightsObservatoryHero />

      <section className={styles.lead}>
        <SplitReveal as="h2" split="words" scroll className={styles.leadTitle}>
          {t('HighlightsPage:copy.leadTitle')}
        </SplitReveal>
        <SplitReveal
          as="p"
          split="lines"
          scroll
          delay={0.2}
          className={styles.leadBody}
        >
          {t('HighlightsPage:copy.leadBody')}
        </SplitReveal>
      </section>

      <HonorRail sectionRef={honorRef} trackRef={honorTrackRef} items={HONOR_RAIL} />

      <div ref={stackRef} className={styles.stack}>
        {highlights.map((item, index) => {
          const Icon = highlightIconMap[item.icon]

          return (
            <FlickerGlow
              key={item.id}
              as="article"
              className={styles.stackCard}
              data-stack-card
              style={{
                top: `calc(clamp(5rem, 12vh, 8rem) + ${index * 1.4}rem)`,
              }}
            >
              <div className={styles.stackHead}>
                <span className={styles.stackIndex}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Scramble scroll className={styles.stackStat}>
                  {item.stat}
                </Scramble>
                {Icon ? <IconChip icon={Icon} size={20} className={styles.stackIcon} /> : null}
              </div>
              <h3 className={styles.stackTitle}>{item.title}</h3>
              {item.subtitle ? (
                <p className={styles.stackSubtitle}>{item.subtitle}</p>
              ) : null}
              <p className={styles.stackBody}>{item.description}</p>
            </FlickerGlow>
          )
        })}
      </div>

      {timeline.length > 0 ? (
        <section
          ref={arcRef}
          className={styles.arc}
          aria-label={t('labels.experienceArc')}
        >
          <p className={styles.arcLabel}>{t('labels.experienceArc')}</p>
          <div className={styles.arcTrack}>
            <div className={styles.arcLine} data-arc-line aria-hidden />
            {timeline.map((item) => (
              <article key={item.id} className={styles.arcRow} data-arc-row>
                <p className={styles.arcPeriod} data-arc-item>
                  {item.period}
                </p>
                <div className={styles.arcMain}>
                  <h3 className={styles.arcTitle} data-arc-item>
                    {item.title}
                  </h3>
                  <p className={styles.arcCompany} data-arc-item>
                    {item.company}
                  </p>
                  <p className={styles.arcSummary} data-arc-item>
                    {item.summary}
                  </p>
                  {item.achievements.length > 0 ? (
                    <ul className={styles.arcAchievements}>
                      {item.achievements.map((achievement) => (
                        <li key={achievement} data-arc-item>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}

export { HighlightsPage }
