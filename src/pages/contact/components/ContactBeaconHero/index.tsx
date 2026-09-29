import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { Nullable } from 'nfx-ui/types'

import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks'

import styles from './styles.module.css'

function ContactBeaconHero() {
  const { t } = useTranslation(['components', 'ContactPage'])
  const rootRef = useRef<Nullable<HTMLElement>>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const root = rootRef.current
      if (!root) return

      gsap.to('[data-beacon-ring]', {
        attr: { r: 52 },
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.35,
      })

      gsap.from('[data-beacon-fade]', {
        opacity: 0,
        y: 20,
        duration: 0.85,
        stagger: 0.08,
        delay: 0.3,
        ease: 'power3.out',
      })
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <header ref={rootRef} className={styles.hero}>
      <div className={styles.split}>
        <div className={styles.left} data-beacon-fade>
          <span className={styles.eyebrow}>{t('ContactPage:intro.eyebrow')}</span>
          <span className={styles.index}>05 / 05</span>
          <h1 className={styles.headline}>{t('navigation.contact')}</h1>
        </div>

        <div className={styles.right} data-beacon-fade>
          <svg className={styles.beacon} viewBox="0 0 120 120" aria-hidden>
            <circle cx="60" cy="60" r="38" fill="none" className={styles.ringStatic} strokeWidth="0.8" />
            <circle cx="60" cy="60" r="44" fill="none" className={styles.ringPulse} data-beacon-ring strokeWidth="0.6" />
            <circle cx="60" cy="60" r="50" fill="none" className={styles.ringPulse} data-beacon-ring strokeWidth="0.4" />
            <circle cx="60" cy="60" r="4" className={styles.core} />
          </svg>
          <p className={styles.freq}>147.92 MHz · OPEN CHANNEL</p>
        </div>
      </div>

      <div className={styles.copy} data-beacon-fade>
        <p className={styles.title}>{t('ContactPage:intro.title')}</p>
        <p className={styles.description}>{t('ContactPage:intro.description')}</p>
      </div>
    </header>
  )
}

export { ContactBeaconHero }
