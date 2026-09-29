import { ArrowUpRight } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dropdown } from 'nfx-ui/components'
import type { Nullable } from 'nfx-ui/types'
import { formatDate } from 'nfx-ui/utils'

import { gsap, ScrollTrigger, useGSAP } from '@/animations/gsap'
import { Marquee } from '@/animations'
import { IconChip } from '@/components/IconChip'
import { lifeTypeIconMap, lifeTypes } from '@/constants/siteContent'
import { routerEventEmitter } from '@/events/router'
import {
  useLifeRecordsQuery,
  useLifeTimelineQuery,
  useReducedMotion,
} from '@/hooks'

import { LifeChronicleHero } from './components/LifeChronicleHero'
import { RecordFlipbook } from './components/RecordFlipbook'
import { LIFE_DRIFT } from './mock'

import styles from './styles.module.css'

function LifePage() {
  const { t } = useTranslation(['components', 'LifePage'])
  const [type, setType] = useState('all')
  const { data: records = [] } = useLifeRecordsQuery()
  const { data: chapters = [] } = useLifeTimelineQuery()
  const spineRef = useRef<Nullable<HTMLDivElement>>(null)
  const streamRef = useRef<Nullable<HTMLDivElement>>(null)
  const flipbookStageRef = useRef<Nullable<HTMLElement>>(null)
  const flipbookRef = useRef<Nullable<HTMLDivElement>>(null)
  const reduced = useReducedMotion()

  const filteredRecords = useMemo(() => {
    return records.filter((record) => type === 'all' || record.type === type)
  }, [records, type])

  const tags = useMemo(() => {
    return Array.from(new Set(records.flatMap((record) => record.tags)))
  }, [records])

  const dropdownOptions = lifeTypes.map((value) => ({
    value,
    label:
      value === 'all'
        ? t('filters.allRecords')
        : t(
            value === 'moment'
              ? 'filters.moments'
              : value === 'snapshot'
                ? 'filters.snapshots'
                : value === 'ritual'
                  ? 'filters.rituals'
                  : 'filters.notes',
          ),
  }))

  useGSAP(
    () => {
      const stage = flipbookStageRef.current
      const book = flipbookRef.current
      if (!stage || !book || reduced) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 861px)', () => {
        const pages = gsap.utils.toArray<HTMLElement>('[data-flip-page]', book)
        if (pages.length === 0) return

        gsap.set(pages, {
          transformOrigin: 'left center',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        })
        gsap.set(pages[0], { rotateY: 0, scaleX: 1, opacity: 1 })
        if (pages.length > 1) {
          gsap.set(pages.slice(1), { rotateY: 86, scaleX: 0.96, opacity: 0.88 })
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => `+=${pages.length * window.innerHeight * 0.5}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        pages.forEach((page, i) => {
          if (i === 0) return
          const prev = pages[i - 1]
          tl.to(
            prev,
            {
              rotateY: -92,
              rotateX: 4,
              scaleX: 0.92,
              opacity: 0.4,
              ease: 'power2.inOut',
              duration: 1,
            },
            i - 1,
          )
          tl.to(
            page,
            {
              rotateY: 0,
              rotateX: 0,
              scaleX: 1,
              opacity: 1,
              ease: 'power2.out',
              duration: 1,
            },
            i - 1 + 0.05,
          )
        })
      })

      mm.add('(max-width: 860px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-flip-page]', book).forEach((page) => {
          gsap.from(page, {
            opacity: 0,
            y: 36,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: page, start: 'top 92%', once: true },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: flipbookStageRef, dependencies: [reduced] },
  )

  useGSAP(
    () => {
      const node = spineRef.current
      if (!node || reduced || chapters.length === 0) return

      gsap.fromTo(
        node.querySelector('[data-spine-line]'),
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: node,
            start: 'top 72%',
            end: 'bottom 65%',
            scrub: true,
          },
        },
      )

      node.querySelectorAll('[data-chapter]').forEach((item) => {
        gsap.from(item.querySelectorAll('[data-chapter-inner]'), {
          opacity: 0,
          y: 38,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.06,
          scrollTrigger: { trigger: item, start: 'top 86%', once: true },
        })
        gsap.from(item.querySelector('[data-chapter-dot]'), {
          scale: 0,
          duration: 0.6,
          ease: 'back.out(2.4)',
          scrollTrigger: { trigger: item, start: 'top 86%', once: true },
        })
      })

      ScrollTrigger.refresh()
    },
    { scope: spineRef, dependencies: [reduced, chapters.length] },
  )

  useGSAP(
    () => {
      const node = streamRef.current
      if (!node || reduced) return

      node
        .querySelectorAll<HTMLElement>('[data-life-card]')
        .forEach((card, index) => {
          gsap.from(card, {
            opacity: 0,
            y: 56,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: { trigger: card, start: 'top 92%', once: true },
          })

          gsap.to(card, {
            y: index % 2 === 0 ? -22 : 22,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })

      ScrollTrigger.refresh()
    },
    {
      scope: streamRef,
      dependencies: [reduced, filteredRecords.map((r) => r.id).join('|')],
    },
  )

  return (
    <div className={styles.page}>
      <LifeChronicleHero />

      {chapters.length > 0 ? (
        <section
          className={styles.chapters}
          aria-label={t('LifePage:timeline.aria')}
        >
          <div ref={spineRef} className={styles.spine}>
            <div className={styles.spineLine} data-spine-line aria-hidden />
            {chapters.map((entry, index) => (
              <article
                key={entry.id}
                className={`${styles.chapter} ${index % 2 === 0 ? styles.chapterLeft : styles.chapterRight}`}
                data-chapter
                data-kind={entry.kind}
              >
                <span
                  className={styles.chapterDot}
                  data-chapter-dot
                  aria-hidden
                />
                <div className={styles.chapterCard}>
                  <p className={styles.chapterPeriod} data-chapter-inner>
                    {entry.period}
                  </p>
                  <h3 className={styles.chapterTitle} data-chapter-inner>
                    {entry.title}
                  </h3>
                  <p className={styles.chapterBody} data-chapter-inner>
                    {entry.body}
                  </p>
                  {entry.projectSlug ? (
                    <button
                      type="button"
                      className={styles.chapterLink}
                      data-chapter-inner
                      onClick={() =>
                        routerEventEmitter.navigate({
                          to: `/projects/${entry.projectSlug}`,
                        })
                      }
                    >
                      {t('LifePage:timeline.openProject')}
                      <IconChip icon={ArrowUpRight} size={14} className={styles.chapterLinkIcon} />
                    </button>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <RecordFlipbook stageRef={flipbookStageRef} bookRef={flipbookRef} cards={LIFE_DRIFT} />

      {tags.length > 0 ? (
        <Marquee duration={30} reverse className={styles.tagTicker}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tagItem}>
              {tag}
              <em aria-hidden>◦</em>
            </span>
          ))}
        </Marquee>
      ) : null}

      <section className={styles.stream}>
        <div className={styles.streamBar}>
          <p className={styles.streamCount} role="status">
            {String(filteredRecords.length).padStart(2, '0')} /{' '}
            {String(records.length).padStart(2, '0')}
          </p>
          <Dropdown options={dropdownOptions} value={type} onChange={setType} />
        </div>

        <div ref={streamRef} className={styles.grid}>
          {filteredRecords.map((record) => {
            const TypeIcon = lifeTypeIconMap[record.type as keyof typeof lifeTypeIconMap]

            return (
            <article key={record.id} className={styles.card} data-life-card data-type={record.type}>
              <div className={styles.cardMeta}>
                <span className={styles.cardType}>
                  {TypeIcon ? <IconChip icon={TypeIcon} size={14} className={styles.cardTypeIcon} /> : null}
                  <span>{t(`lifeTypes.${record.type}`)}</span>
                  <span>{record.mood}</span>
                </span>
                <time className={styles.cardDate}>
                  {formatDate(record.date)}
                </time>
              </div>
              <h2 className={styles.cardTitle}>{record.title}</h2>
              <p className={styles.cardExcerpt}>{record.excerpt}</p>
              <p className={styles.cardBody}>{record.body}</p>
              <div className={styles.cardFooter}>
                <em>{record.place}</em>
                <div className={styles.cardTags}>
                  {record.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export { LifePage }
