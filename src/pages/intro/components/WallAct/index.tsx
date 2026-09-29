import type { RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import type { Nullable } from 'nfx-ui/types'

import { FieldGridBackdrop } from '@/components/FieldGridBackdrop'
import { IconChip } from '@/components/IconChip'
import { iconForContentTags } from '@/constants/contentTagIcons'

import type { IntroWallItem } from '../../mock'
import type { IntroScrollPhase } from '../../types'
import styles from '../../styles.module.css'

type WallActProps = {
  wallRef: RefObject<Nullable<HTMLElement>>
  trackRef: RefObject<Nullable<HTMLDivElement>>
  items: IntroWallItem[]
  scrollPhase: IntroScrollPhase
}

function WallAct({ wallRef, trackRef, items, scrollPhase }: WallActProps) {
  const { t } = useTranslation('components')

  return (
    <section
      ref={wallRef}
      className={styles.wall}
      data-intro-act="wall"
      data-intro-phase={scrollPhase}
      data-intro-active={scrollPhase === 0 || undefined}
    >
      <div ref={trackRef} className={styles.wallTrack} data-intro-wall-track>
        <div className={`${styles.wallPanel} ${styles.wallLead}`} data-wall-panel>
          <FieldGridBackdrop className={styles.wallField} />
          <p className={styles.wallKicker}>Flight deck</p>
          <h2 className={styles.wallLeadTitle}>
            Selected builds,
            <br />
            in orbit order.
          </h2>
          <p className={styles.wallLeadHint}>Keep scrolling down — the wall slides sideways.</p>
        </div>

        {items.map((item) => {
          const Glyph = iconForContentTags(item.tags)

          return (
            <article
              key={item.id}
              className={styles.wallPanel}
              data-wall-panel
              data-accent={item.accent}
            >
              <FieldGridBackdrop className={styles.wallField} />
              <span className={styles.wallNum} data-wall-num aria-hidden>
                {item.index}
              </span>
              <div className={styles.wallContent}>
                <p className={styles.wallTag}>
                  <span className={styles.wallTagList}>
                    {item.tags.map((tag, index) => (
                      <span key={tag}>
                        {index > 0 ? <span className={styles.wallTagSep}> / </span> : null}
                        {t(`contentTags.${tag}`)}
                      </span>
                    ))}
                  </span>
                  <time className={styles.wallYear}>{item.year}</time>
                </p>
                <h3 className={styles.wallTitle}>
                  <span className={styles.wallGlyphFrame}>
                    <IconChip icon={Glyph} size={30} strokeWidth={1.65} className={styles.wallGlyph} />
                  </span>
                  <span className={styles.wallTitleText}>{item.title}</span>
                </h3>
                <p className={styles.wallBlurb}>{item.blurb}</p>
              </div>
            </article>
          )
        })}
      </div>
      <div className={styles.wallProgress}>
        <span data-wall-progress />
      </div>
    </section>
  )
}

export { WallAct }
