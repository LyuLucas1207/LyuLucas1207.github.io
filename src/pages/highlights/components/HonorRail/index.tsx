import { Award } from 'lucide-react'
import type { RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import type { Nullable } from 'nfx-ui/types'

import { IconChip } from '@/components/IconChip'

import type { HonorRailItem } from '../../mock'
import styles from './styles.module.css'

type HonorRailProps = {
  sectionRef: RefObject<Nullable<HTMLElement>>
  trackRef: RefObject<Nullable<HTMLDivElement>>
  items: HonorRailItem[]
}

function HonorRail({ sectionRef, trackRef, items }: HonorRailProps) {
  const { t } = useTranslation('components')

  return (
    <section ref={sectionRef} className={styles.honorRail} aria-label="Honor orbit">
      <div ref={trackRef} className={styles.honorTrack}>
        {items.map((item) => (
          <article key={item.id} className={styles.honorPanel} data-honor-panel>
            <IconChip icon={Award} size={18} className={styles.honorIcon} />
            <span className={styles.honorIndex}>{item.index}</span>
            <h3 className={styles.honorTitle}>{item.title}</h3>
            <p className={styles.honorStat}>
              {item.statTags.map((tag, index) => (
                <span key={tag}>
                  {index > 0 ? <span className={styles.honorStatSep}> — </span> : null}
                  {t(`contentTags.${tag}`)}
                </span>
              ))}
            </p>
            <p className={styles.honorDetail}>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export { HonorRail }
