import type { RefObject } from 'react'
import type { Nullable } from 'nfx-ui/types'

import type { LifeDriftCard } from '../../mock'
import styles from './styles.module.css'

type RecordFlipbookProps = {
  stageRef: RefObject<Nullable<HTMLElement>>
  bookRef: RefObject<Nullable<HTMLDivElement>>
  cards: LifeDriftCard[]
}

function RecordFlipbook({ stageRef, bookRef, cards }: RecordFlipbookProps) {
  return (
    <section ref={stageRef} className={styles.flipbook} aria-label="Life record flipbook">
      <div className={styles.flipbookHeader}>
        <p className={styles.flipbookLabel}>Record flipbook — 3D page turns</p>
        <p className={styles.flipbookCount}>
          {String(cards.length).padStart(2, '0')} spreads
        </p>
      </div>

      <div className={styles.flipbookViewport}>
        <div ref={bookRef} className={styles.book}>
          {cards.map((card, index) => (
            <article
              key={card.id}
              className={styles.page}
              data-flip-page
              data-page-index={index}
              style={{ zIndex: cards.length - index }}
            >
              <div className={styles.pageFace}>
                <span className={styles.pageIndex}>{String(index + 1).padStart(2, '0')}</span>
                <p className={styles.pagePeriod}>{card.period}</p>
                <h3 className={styles.pageTitle}>{card.title}</h3>
                <p className={styles.pageDetail}>{card.detail}</p>
                <span className={styles.pageFold} aria-hidden />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export { RecordFlipbook }
