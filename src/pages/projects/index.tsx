import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dropdown, SearchInput } from 'nfx-ui/components'
import type { Nullable } from 'nfx-ui/types'

import { gsap, ScrollTrigger, useGSAP } from '@/animations/gsap'
import { IconChip } from '@/components/IconChip'
import { ProjectsDockHero } from './components/ProjectsDockHero'
import { projectGroups } from '@/constants/siteContent'
import { routerEventEmitter } from '@/events/router'
import { useProjectsQuery, useReducedMotion } from '@/hooks'

import { FeaturedRail } from './components/FeaturedRail'
import { PROJECTS_RAIL } from './mock'

import styles from './styles.module.css'

function ProjectsPage() {
  const { t } = useTranslation(['components', 'ProjectsPage'])
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('all')
  const { data: projects = [] } = useProjectsQuery()
  const listRef = useRef<Nullable<HTMLDivElement>>(null)
  const featuredRef = useRef<Nullable<HTMLElement>>(null)
  const railRef = useRef<Nullable<HTMLElement>>(null)
  const railTrackRef = useRef<Nullable<HTMLDivElement>>(null)
  const orbitRef = useRef<Nullable<HTMLDivElement>>(null)
  const pageMainRef = useRef<Nullable<HTMLDivElement>>(null)
  const reduced = useReducedMotion()

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesGroup = group === 'all' || project.group === group
      const haystack =
        `${project.title} ${project.summary} ${project.role} ${project.stack.join(' ')}`.toLowerCase()
      const matchesQuery = haystack.includes(query.toLowerCase())

      return matchesGroup && matchesQuery
    })
  }, [group, projects, query])

  const dropdownOptions = projectGroups.map((value) => ({
    value,
    label: value === 'all' ? t('filters.allProjects') : t(`filters.${value}`),
  }))

  const featured = projects.find((p) => p.featured)
  const indexMap = useMemo(() => {
    const map = new Map<string, number>()
    projects.forEach((p, i) => map.set(p.slug, i + 1))
    return map
  }, [projects])

  useGSAP(
    () => {
      const rail = railRef.current
      const track = railTrackRef.current
      if (!rail || !track || reduced) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 861px)', () => {
        const dist = () => track.scrollWidth - window.innerWidth
        const orbit = orbitRef.current
        const pageMain = pageMainRef.current

        const railTween = gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: rail,
            start: 'top top',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        gsap.fromTo(
          '[data-rail-progress]',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: rail,
              start: 'top top',
              end: () => `+=${dist()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        )

        gsap.utils.toArray<HTMLElement>('[data-rail-num]', track).forEach((num) => {
          gsap.fromTo(
            num,
            { xPercent: 40, opacity: 0.3 },
            {
              xPercent: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: num,
                containerAnimation: railTween,
                start: 'right 105%',
                end: 'left 45%',
                scrub: true,
              },
            },
          )
        })

        gsap.utils.toArray<HTMLElement>('[data-field-shift]', track).forEach((layer) => {
          const panel = layer.closest('[data-rail-panel]')
          if (!panel) return

          gsap.fromTo(
            layer,
            { yPercent: 10 },
            {
              yPercent: -32,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: railTween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })

        if (orbit && pageMain) {
          gsap.set(pageMain, { y: 56, opacity: 0.15 })

          gsap
            .timeline({
              scrollTrigger: {
                trigger: rail,
                start: 'top top',
                end: () => `+=${dist()}`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(orbit, { autoAlpha: 1, y: 0 }, { autoAlpha: 1, y: 0, duration: 0.55 }, 0)
            .to(
              orbit,
              { y: 140, autoAlpha: 0, duration: 0.38, ease: 'power2.in' },
              0.58,
            )
            .fromTo(
              pageMain,
              { y: 56, opacity: 0.15 },
              { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
              0.62,
            )
        }
      })

      mm.add('(max-width: 860px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-rail-panel]', track).forEach((panel) => {
          gsap.from(panel, {
            opacity: 0,
            x: 48,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 92%', once: true },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: railRef, dependencies: [reduced] },
  )

  useGSAP(
    () => {
      const node = featuredRef.current
      if (!node || reduced) return

      gsap.from(node.querySelectorAll('[data-featured-item]'), {
        opacity: 0,
        y: 36,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: node, start: 'top 80%', once: true },
      })

      gsap.fromTo(
        node.querySelector('[data-featured-glow]'),
        { yPercent: 30 },
        {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: node,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    },
    { scope: featuredRef, dependencies: [reduced, featured?.id] },
  )

  useGSAP(
    () => {
      const node = listRef.current
      if (!node || reduced) return

      node.querySelectorAll('[data-project-row]').forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 44,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: row, start: 'top 90%', once: true },
        })
      })

      ScrollTrigger.refresh()
    },
    {
      scope: listRef,
      dependencies: [reduced, filteredProjects.map((p) => p.slug).join('|')],
    },
  )

  const openProject = (slug: string) => {
    routerEventEmitter.navigate({ to: `/projects/${slug}` })
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageStage}>
        <ProjectsDockHero />

        <FeaturedRail
          sectionRef={railRef}
          trackRef={railTrackRef}
          orbitRef={orbitRef}
          items={PROJECTS_RAIL}
        />
      </div>

      <div ref={pageMainRef} className={styles.pageMain}>
      {featured ? (
        <section
          ref={featuredRef}
          className={styles.featured}
          data-accent={featured.accent}
          aria-labelledby="featured-heading"
        >
          <div className={styles.featuredGlow} data-featured-glow aria-hidden />
          <p className={styles.kicker} data-featured-item>
            {t('ProjectsPage:copy.featuredKicker')}
          </p>
          <h2
            id="featured-heading"
            className={styles.featuredTitle}
            data-featured-item
          >
            {featured.title}
          </h2>
          <div className={styles.featuredGrid}>
            <p className={styles.featuredSummary} data-featured-item>
              {featured.summary}
            </p>
            <dl className={styles.featuredMeta} data-featured-item>
              <div>
                <dt>{t('labels.role')}</dt>
                <dd>{featured.role}</dd>
              </div>
              <div>
                <dt>{t('labels.impact')}</dt>
                <dd>{featured.impact}</dd>
              </div>
              <div>
                <dt>{t(`projectCategories.${featured.category}`)}</dt>
                <dd>{featured.year}</dd>
              </div>
            </dl>
          </div>
          <div className={styles.featuredLinks} data-featured-item>
            <a href={featured.repositoryUrl} target="_blank" rel="noreferrer">
              <IconChip icon={ExternalLink} size={14} className={styles.featuredLinkIcon} />
              {t('ProjectsPage:copy.repository')}
            </a>
            {featured.liveUrl ? (
              <a href={featured.liveUrl} target="_blank" rel="noreferrer">
                <IconChip icon={ExternalLink} size={14} className={styles.featuredLinkIcon} />
                {t('ProjectsPage:copy.relatedLink')}
              </a>
            ) : null}
          </div>
        </section>
      ) : null}

      <section
        className={styles.filterBar}
        aria-label={t('ProjectsPage:copy.filtersAria')}
      >
        <p className={styles.count} role="status">
          {t('ProjectsPage:copy.showing', {
            count: filteredProjects.length,
            total: projects.length,
          })}
        </p>
        <div className={styles.filterControls}>
          <div className={styles.searchWrap}>
            <SearchInput
              placeholder={t('ProjectsPage:copy.searchPlaceholder')}
              value={query}
              onChange={setQuery}
            />
          </div>
          <Dropdown
            options={dropdownOptions}
            value={group}
            onChange={setGroup}
          />
        </div>
      </section>

      <div ref={listRef} className={styles.list}>
        {filteredProjects.map((project) => {
          const n = indexMap.get(project.slug)

          return (
            <article
              key={project.slug}
              className={styles.row}
              data-project-row
              data-accent={project.accent}
              role="link"
              tabIndex={0}
              aria-label={project.title}
              onClick={() => openProject(project.slug)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openProject(project.slug)
                }
              }}
            >
              <span className={styles.rowIndex}>
                {n != null ? String(n).padStart(2, '0') : '—'}
              </span>
              <div className={styles.rowMain}>
                <h3 className={styles.rowTitle}>{project.title}</h3>
                <p className={styles.rowSummary}>{project.summary}</p>
              </div>
              <div className={styles.rowMeta}>
                <span className={styles.rowCategory}>
                  <span>{t(`projectCategories.${project.category}`)}</span>
                  <time>{project.year}</time>
                </span>
                <span className={styles.rowStack}>
                  {project.stack.slice(0, 4).join(' / ')}
                </span>
              </div>
              <span className={styles.rowArrow} aria-hidden>
                <IconChip icon={ArrowUpRight} size={20} className={styles.rowArrowIcon} />
              </span>
              <span className={styles.rowFill} aria-hidden />
            </article>
          )
        })}
      </div>

      {filteredProjects.length === 0 ? (
        <p className={styles.empty}>{t('empty.projects')}</p>
      ) : null}
      </div>
    </div>
  )
}

export { ProjectsPage }
