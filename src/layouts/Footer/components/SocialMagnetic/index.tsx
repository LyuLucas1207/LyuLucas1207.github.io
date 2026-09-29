import { useTranslation } from 'react-i18next'

import { HoverScramble, Magnetic } from '@/animations'
import { socialLinks } from '@/constants/siteContent'

import styles from './styles.module.css'

function SocialMagnetic() {
  const { t } = useTranslation('components')

  return (
    <div className={styles.root}>
      {socialLinks.map((link) => (
        <Magnetic key={link.labelKey} className={styles.magneticWrap} strength={0.22}>
          <a
            href={link.href}
            className={styles.link}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
          >
            <span className={styles.linkRoll}>
              <HoverScramble className={styles.linkLabel}>
                {t(link.labelKey)}
              </HoverScramble>
              <span className={styles.linkLabel} aria-hidden>
                {t(link.labelKey)}
              </span>
            </span>
          </a>
        </Magnetic>
      ))}
    </div>
  )
}

export { SocialMagnetic }
