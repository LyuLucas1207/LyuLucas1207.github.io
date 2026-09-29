import type { ReactNode } from 'react'
import { useRef } from 'react'

import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks'

type MagneticProps = {
  children: ReactNode
  className?: string
  strength?: number
}

function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { contextSafe } = useGSAP({ scope: ref })

  const onMove = contextSafe((event: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current
    if (!node || reduced) return

    const rect = node.getBoundingClientRect()
    gsap.to(node, {
      x: (event.clientX - rect.left - rect.width / 2) * strength,
      y: (event.clientY - rect.top - rect.height / 2) * strength,
      duration: 0.35,
      ease: 'power3.out',
    })
  })

  const onLeave = contextSafe(() => {
    const node = ref.current
    if (!node || reduced) return

    gsap.to(node, {
      x: 0,
      y: 0,
      duration: 0.55,
      ease: 'elastic.out(1, 0.45)',
    })
  })

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}

export { Magnetic }
