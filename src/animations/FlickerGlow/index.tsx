import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import styles from './styles.module.css'

type FlickerGlowProps<T extends ElementType = 'div'> = {
  children: ReactNode
  className?: string
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

function FlickerGlow<T extends ElementType = 'div'>({
  children,
  className = '',
  as,
  ...rest
}: FlickerGlowProps<T>) {
  const Tag = as ?? 'div'
  return (
    <Tag className={`${styles.wrap} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}

export { FlickerGlow }
