import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { Nullable } from 'nfx-ui/types'

import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks'

import styles from './styles.module.css'

function ProjectsDockHero() {
  const { t } = useTranslation(['components', 'ProjectsPage'])
  const rootRef = useRef<Nullable<HTMLElement>>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const root = rootRef.current
      if (!root) return

      gsap.from('[data-dock-grid]', {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      })

      gsap.fromTo(
        root.querySelector('[data-dock-crosshair-h]'),
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power3.inOut', delay: 0.2 },
      )
      gsap.fromTo(
        root.querySelector('[data-dock-crosshair-v]'),
        { scaleY: 0 },
        { scaleY: 1, duration: 1, ease: 'power3.inOut', delay: 0.2 },
      )

      gsap.from('[data-dock-fade]', {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.1,
        delay: 0.45,
        ease: 'power3.out',
      })
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <header ref={rootRef} className={styles.hero}>
      <svg className={styles.grid} data-dock-grid viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={40 + i * 40}
            x2="800"
            y2={40 + i * 40}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {Array.from({ length: 17 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 50}
            y1="0"
            x2={i * 50}
            y2="400"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <div className={styles.crosshair} aria-hidden>
        <span className={styles.crosshairH} data-dock-crosshair-h />
        <span className={styles.crosshairV} data-dock-crosshair-v />
      </div>

      <div className={styles.topBar} data-dock-fade>
        <span className={styles.eyebrow}>{t('ProjectsPage:intro.eyebrow')}</span>
        <span className={styles.index}>02 / 05</span>
      </div>

      <h1 className={styles.headline} data-dock-fade>
        {t('navigation.projects')}
      </h1>

      <div className={styles.dockPanel} data-dock-fade>
        <p className={styles.panelTitle}>{t('ProjectsPage:intro.title')}</p>
        <p className={styles.panelBody}>{t('ProjectsPage:intro.description')}</p>
      </div>
    </header>
  )
}

export { ProjectsDockHero }
