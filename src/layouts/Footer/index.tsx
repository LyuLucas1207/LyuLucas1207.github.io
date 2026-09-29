import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { Nullable } from 'nfx-ui/types'

import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks'

import { ContentTag } from '@/enums'

import { ConstellationMap } from './components/ConstellationMap'
import { FooterInstrument } from './components/FooterInstrument'
import { FooterSignature } from './components/FooterSignature'
import { SocialMagnetic } from './components/SocialMagnetic'
import styles from './styles.module.css'

function Footer() {
  const rootRef = useRef<Nullable<HTMLElement>>(null)
  const { t } = useTranslation('components')
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root || reduced) return

      gsap.from(root.querySelector('[data-footer-subtitle]'), {
        opacity: 0,
        letterSpacing: '0.5em',
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 92%', once: true },
      })
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <footer ref={rootRef} className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <FooterSignature
            name="Lucas Lyu"
            subtitleTags={[
              ContentTag.ComputerEngineering,
              ContentTag.Ubc,
              ContentTag.Year4Senior,
              ContentTag.VancouverBc,
            ]}
          />
          <p className={styles.tagline}>{t('footer.description')}</p>
        </div>

        <ConstellationMap />

        <div className={styles.bottomRow}>
          <FooterInstrument />
          <SocialMagnetic />
        </div>
      </div>
    </footer>
  )
}

export { Footer }
