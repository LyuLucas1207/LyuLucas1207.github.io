import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { Nullable } from 'nfx-ui/types'

import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks'

import styles from './styles.module.css'

function LifeChronicleHero() {
  const { t } = useTranslation(['components', 'LifePage'])
  const rootRef = useRef<Nullable<HTMLElement>>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const root = rootRef.current
      if (!root) return

      gsap.fromTo(
        root.querySelector('[data-life-ruler]'),
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.4, ease: 'power3.inOut' },
      )

      gsap.from('[data-life-tick]', {
        scaleY: 0,
        transformOrigin: 'center bottom',
        duration: 0.5,
        stagger: 0.04,
        delay: 0.35,
        ease: 'power2.out',
      })

      gsap.from('[data-life-fade]', {
        opacity: 0,
        y: 22,
        duration: 0.85,
        stagger: 0.08,
        delay: 0.5,
        ease: 'power3.out',
      })
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <header ref={rootRef} className={styles.hero}>
      <div className={styles.stampRow} data-life-fade>
        <span className={styles.stampIndex}>03</span>
        <span className={styles.stampOf}>/ 05</span>
        <span className={styles.stampLabel}>{t('LifePage:intro.eyebrow')}</span>
      </div>

      <div className={styles.rulerWrap} aria-hidden>
        <div className={styles.ruler} data-life-ruler />
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className={styles.tick}
            data-life-tick
            style={{ left: `${(i / 23) * 100}%` }}
          />
        ))}
      </div>

      <h1 className={styles.headline} data-life-fade>
        {t('navigation.life')}
      </h1>

      <div className={styles.memo} data-life-fade>
        <span className={styles.memoCorner} aria-hidden />
        <p className={styles.memoTitle}>{t('LifePage:intro.title')}</p>
        <p className={styles.memoBody}>{t('LifePage:intro.description')}</p>
      </div>
    </header>
  )
}

export { LifeChronicleHero }
