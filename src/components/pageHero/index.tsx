import type { ReactNode } from 'react'
import { useRef } from 'react'

import { gsap, useGSAP } from '@/animations/gsap'
import { Scramble, SplitReveal } from '@/animations'
import { useReducedMotion } from '@/hooks'

import styles from './styles.module.css'

type PageHeroProps = {
  index: string
  eyebrow: string
  headline: string
  title: string
  description?: string
  children?: ReactNode
}

function PageHero({
  index,
  eyebrow,
  headline,
  title,
  description,
  children,
}: PageHeroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return

      gsap.from('[data-hero-rule]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.3,
        ease: 'power3.inOut',
        stagger: 0.12,
      })

      gsap.from('[data-hero-fade]', {
        opacity: 0,
        y: 18,
        duration: 0.9,
        delay: 0.5,
        ease: 'power3.out',
        stagger: 0.08,
      })

      gsap.to('[data-hero-headline]', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <header ref={rootRef} className={styles.hero}>
      <div className={styles.topRow} data-hero-fade>
        <Scramble className={styles.eyebrow}>{eyebrow}</Scramble>
        <span className={styles.index}>{index}</span>
      </div>

      <div className={styles.rule} data-hero-rule />

      <div className={styles.headlineWrap} data-hero-headline>
        <SplitReveal
          as="h1"
          split="chars"
          className={styles.headline}
          delay={0.15}
        >
          {headline}
        </SplitReveal>
      </div>

      <div className={styles.subGrid}>
        <SplitReveal as="p" split="lines" className={styles.title} delay={0.4}>
          {title}
        </SplitReveal>
        {description ? (
          <p className={styles.description} data-hero-fade>
            {description}
          </p>
        ) : null}
      </div>

      <div className={styles.rule} data-hero-rule />

      {children}
    </header>
  )
}

export { PageHero }
