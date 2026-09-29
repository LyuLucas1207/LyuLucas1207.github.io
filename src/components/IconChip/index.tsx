import type { LucideIcon } from 'lucide-react'

import styles from './styles.module.css'

type IconChipProps = {
  icon: LucideIcon
  size?: number
  strokeWidth?: number
  className?: string
}

/** Inline Lucide wrapper — pair with page-local `.yourIcon:hover` transforms. */
function IconChip({ icon: Icon, size = 18, strokeWidth = 1.75, className }: IconChipProps) {
  return (
    <span className={`${styles.chip} ${className ?? ''}`.trim()} aria-hidden>
      <Icon size={size} strokeWidth={strokeWidth} />
    </span>
  )
}

export { IconChip }
