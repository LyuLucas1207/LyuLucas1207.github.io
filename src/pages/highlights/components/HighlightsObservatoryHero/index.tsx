import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { Nullable } from 'nfx-ui/types'

import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks'

import styles from './styles.module.css'

function HighlightsObservatoryHero() {
  const { t } = useTranslation(['components', 'HighlightsPage'])
  const rootRef = useRef<Nullable<HTMLElement>>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const root = rootRef.current
      if (!root) return

      gsap.fromTo(
        root.querySelector('[data-obs-arc]'),
        { drawSVG: '0%' },
        { drawSVG: '100%', duration: 1.6, ease: 'power2.inOut' },
      )

      gsap.from('[data-obs-star]', {
        scale: 0,
        opacity: 0,
        duration: 0.45,
        stagger: 0.06,
        delay: 0.5,
        ease: 'back.out(2.2)',
      })

      gsap.from('[data-obs-fade]', {
        opacity: 0,
        y: 24,
        duration: 0.85,
        stagger: 0.09,
        delay: 0.65,
        ease: 'power3.out',
      })
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <header ref={rootRef} className={styles.hero}>
      <div className={styles.metaRow} data-obs-fade>
        <span className={styles.eyebrow}>{t('HighlightsPage:intro.eyebrow')}</span>
        <span className={styles.index}>04 / 05</span>
      </div>

      <div className={styles.observatory} aria-hidden>
        <svg className={styles.arcSvg} viewBox="0 0 400 120" preserveAspectRatio="xMidYMid meet">
          <path
            data-obs-arc
            d="M 20 100 A 180 180 0 0 1 380 100"
            fill="none"
            stroke="rgba(var(--color-primary-rgb), 0.5)"
            strokeWidth="1"
          />
          {[
            [60, 72],
            [120, 48],
            [200, 32],
            [280, 48],
            [340, 72],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="2.5"
              className={styles.star}
              data-obs-star
            />
          ))}
        </svg>
      </div>

      <h1 className={styles.headline} data-obs-fade>
        {t('navigation.highlights')}
      </h1>

      <div className={styles.columns} data-obs-fade>
        <p className={styles.title}>{t('HighlightsPage:intro.title')}</p>
        <p className={styles.description}>{t('HighlightsPage:intro.description')}</p>
      </div>
    </header>
  )
}

export { HighlightsObservatoryHero }
