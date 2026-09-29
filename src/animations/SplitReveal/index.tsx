import type { CSSProperties, ElementType } from 'react'
import { useRef } from 'react'

import { gsap, SplitText, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks'

type SplitRevealProps = {
  children: string
  as?: ElementType
  className?: string
  style?: CSSProperties
  split?: 'chars' | 'words' | 'lines'
  delay?: number
  duration?: number
  stagger?: number
  scroll?: boolean
}

const DEFAULT_STAGGER: Record<
  NonNullable<SplitRevealProps['split']>,
  number
> = {
  chars: 0.022,
  words: 0.045,
  lines: 0.1,
}

function SplitReveal({
  children,
  as: Tag = 'div',
  className,
  style,
  split = 'lines',
  delay = 0,
  duration = 1.15,
  stagger,
  scroll = false,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (!el || reduced || !children) return

      const instance = SplitText.create(el, {
        type: split === 'lines' ? 'lines' : `lines,${split}`,
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          const targets =
            split === 'chars'
              ? self.chars
              : split === 'words'
                ? self.words
                : self.lines

          return gsap.from(targets, {
            yPercent: 118,
            duration,
            delay,
            ease: 'power4.out',
            stagger: stagger ?? DEFAULT_STAGGER[split],
            scrollTrigger: scroll
              ? { trigger: el, start: 'top 88%', once: true }
              : undefined,
          })
        },
      })

      return () => instance.revert()
    },
    { dependencies: [children, split, reduced, scroll], revertOnUpdate: true },
  )

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}

export { SplitReveal }
