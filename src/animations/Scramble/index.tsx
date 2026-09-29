import type { ElementType } from 'react'
import { useRef } from 'react'

import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks'

type ScrambleProps = {
  children: string
  as?: ElementType
  className?: string
  delay?: number
  duration?: number
  scroll?: boolean
}

function Scramble({
  children,
  as: Tag = 'span',
  className,
  delay = 0,
  duration = 1.3,
  scroll = false,
}: ScrambleProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (!el || reduced || !children) return

      gsap.fromTo(
        el,
        { opacity: 0.4 },
        {
          opacity: 1,
          duration,
          delay,
          ease: 'none',
          scrambleText: {
            text: children,
            chars: '∙×+◦/—01',
            speed: 0.9,
            revealDelay: 0.15,
          },
          scrollTrigger: scroll
            ? { trigger: el, start: 'top 92%', once: true }
            : undefined,
        },
      )
    },
    { dependencies: [children, reduced, scroll], revertOnUpdate: true },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

export { Scramble }
