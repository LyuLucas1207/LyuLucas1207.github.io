import { ArrowUpRight } from 'lucide-react'
import type { RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import type { Nullable } from 'nfx-ui/types'

import { FieldGridBackdrop } from '@/components/FieldGridBackdrop'
import { IconChip } from '@/components/IconChip'
import { iconForContentTags } from '@/constants/contentTagIcons'
import { routerEventEmitter } from '@/events/router'

import type { ProjectRailItem } from '../../mock'
import { ProjectsOrbitStage } from '../ProjectsOrbitStage'
import styles from '../../styles.module.css'

type FeaturedRailProps = {
  sectionRef: RefObject<Nullable<HTMLElement>>
  trackRef: RefObject<Nullable<HTMLDivElement>>
  orbitRef: RefObject<Nullable<HTMLDivElement>>
  items: ProjectRailItem[]
}

function FeaturedRail({ sectionRef, trackRef, orbitRef, items }: FeaturedRailProps) {
  const { t } = useTranslation(['ProjectsPage', 'components'])

  return (
    <section ref={sectionRef} className={styles.rail} aria-label={t('copy.railAria', { defaultValue: 'Featured orbit' })}>
      <ProjectsOrbitStage ref={orbitRef} />
      <div ref={trackRef} className={styles.railTrack}>
        <div className={`${styles.railPanel} ${styles.railLead}`} data-rail-panel>
          <FieldGridBackdrop className={styles.railField} />
          <p className={styles.railKicker}>{t('copy.railKicker', { defaultValue: 'Orbit select' })}</p>
          <h2 className={styles.railTitle}>
            {t('copy.railTitle', { defaultValue: 'Featured builds slide in from the right.' })}
          </h2>
        </div>

        {items.map((item) => {
          const Glyph = iconForContentTags(item.tags)

          return (
            <article key={item.slug} className={styles.railPanel} data-rail-panel data-accent={item.accent}>
              <FieldGridBackdrop className={styles.railField} />
              <span className={styles.railIndex} data-rail-num aria-hidden>
                {item.index}
              </span>
              <p className={styles.railTag}>
                <span className={styles.railTagList}>
                  {item.tags.map((tag, index) => (
                    <span key={tag}>
                      {index > 0 ? <span className={styles.railTagSep}> · </span> : null}
                      {t(`contentTags.${tag}`, { ns: 'components' })}
                    </span>
                  ))}
                </span>
                <time className={styles.railYear}>{item.year}</time>
              </p>
              <h3 className={styles.railItemTitle}>
                <span className={styles.railGlyphFrame}>
                  <IconChip icon={Glyph} size={24} strokeWidth={1.65} className={styles.railGlyph} />
                </span>
                <span className={styles.railTitleText}>{item.title}</span>
              </h3>
              <p className={styles.railBlurb}>{item.blurb}</p>
              <div className={styles.railStack}>
                {item.stack.slice(0, 5).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <button
                type="button"
                className={styles.railOpen}
                onClick={() => routerEventEmitter.navigate({ to: `/projects/${item.slug}` })}
              >
                {t('copy.openCase', { defaultValue: 'Open case' })}
                <IconChip icon={ArrowUpRight} size={14} className={styles.railOpenIcon} />
              </button>
            </article>
          )
        })}
      </div>
      <div className={styles.railProgress}>
        <span data-rail-progress />
      </div>
    </section>
  )
}

export { FeaturedRail }
