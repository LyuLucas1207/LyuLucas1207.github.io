import type { ElementType } from 'react'
import { useRef } from 'react'

import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks'

type HoverScrambleProps = {
  children: string
  as?: ElementType
  className?: string
  duration?: number
}

function HoverScramble({
  children,
  as: Tag = 'span',
  className,
  duration = 0.55,
}: HoverScrambleProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { contextSafe } = useGSAP({ scope: ref })

  const onEnter = contextSafe(() => {
    const el = ref.current
    if (!el || reduced) return

    gsap.to(el, {
      duration,
      ease: 'none',
      scrambleText: {
        text: children,
        chars: '∙×+◦/—01',
        speed: 1.2,
        revealDelay: 0.05,
      },
    })
  })

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseEnter={onEnter}
      onFocus={onEnter}
    >
      {children}
    </Tag>
  )
}

export { HoverScramble }
