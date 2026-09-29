import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Scramble, SplitReveal } from '@/animations'

import { INTRO_CLOSING, INTRO_HERO } from '../../mock'
import styles from '../../styles.module.css'

type ClosingActProps = {
  onOpenChannel: () => void
}

function ClosingAct({ onOpenChannel }: ClosingActProps) {
  const { t } = useTranslation('components')

  return (
    <section className={styles.closing} data-intro-act="closing">
      <Scramble scroll className={styles.closingKicker}>
        {INTRO_CLOSING.kicker}
      </Scramble>
      <SplitReveal as="h2" split="words" scroll className={styles.closingTitle}>
        {INTRO_CLOSING.title}
      </SplitReveal>
      <p className={styles.closingBody}>{INTRO_CLOSING.body}</p>
      <button type="button" className={styles.closingCta} onClick={onOpenChannel}>
        {INTRO_CLOSING.cta}
        <ArrowUpRight size={18} aria-hidden />
      </button>
      <p className={styles.closingMeta}>
        {t(`contentTags.${INTRO_HERO.statusTags[0]}`)} — {t(`contentTags.${INTRO_HERO.statusTags[1]}`)}
      </p>
    </section>
  )
}

export { ClosingAct }
