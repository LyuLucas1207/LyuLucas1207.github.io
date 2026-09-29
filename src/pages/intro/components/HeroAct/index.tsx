import { ArrowDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Scramble, SplitReveal } from '@/animations'
import { IconChip } from '@/components/IconChip'

import { INTRO_HERO } from '../../mock'
import styles from '../../styles.module.css'

function HeroAct() {
  const { t } = useTranslation('components')

  return (
    <section className={styles.hero}>
      <div className={styles.heroTop} data-hero-fade>
        <Scramble className={styles.eyebrow}>{INTRO_HERO.eyebrow}</Scramble>
        <span className={styles.heroIndex}>LOG / 01</span>
      </div>
      <div className={styles.rule} data-hero-rule />

      <div className={styles.heroStage}>
        <SplitReveal as="h1" split="chars" className={styles.heroName} delay={0.18}>
          {INTRO_HERO.name}
        </SplitReveal>

        <div className={styles.heroBottom}>
          <SplitReveal as="p" split="lines" className={styles.heroStatement} delay={0.5}>
            {INTRO_HERO.statement}
          </SplitReveal>

          <aside className={styles.heroFacts} data-hero-fade>
            <p className={styles.heroFactLine}>
              {t(`contentTags.${INTRO_HERO.roleTags[0]}`)} · {t(`contentTags.${INTRO_HERO.roleTags[1]}`)}
            </p>
            <p className={styles.heroFactLine}>{t(`contentTags.${INTRO_HERO.yearTag}`)}</p>
            <p className={styles.heroFactLine}>{t(`contentTags.${INTRO_HERO.locationTag}`)}</p>
            <p className={styles.heroStatus}>
              <span className={styles.statusPulse} aria-hidden />
              <span>{t(`contentTags.${INTRO_HERO.statusTags[0]}`)}</span>
            </p>
            <p className={styles.heroFactMuted}>{t(`contentTags.${INTRO_HERO.statusTags[1]}`)}</p>
          </aside>
        </div>
      </div>

      <div className={styles.rule} data-hero-rule />
      <p className={styles.scrollHint} data-hero-fade>
        <IconChip icon={ArrowDown} size={14} className={styles.scrollHintIcon} />
        {INTRO_HERO.scrollHint}
      </p>
    </section>
  )
}

export { HeroAct }
