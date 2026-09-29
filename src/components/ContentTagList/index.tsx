import { useTranslation } from 'react-i18next'

import type { ContentTag } from '@/enums'

import styles from './styles.module.css'

type ContentTagListProps = {
  tags: ContentTag[]
  className?: string
}

function ContentTagList({ tags, className }: ContentTagListProps) {
  const { t } = useTranslation('components')

  return (
    <span className={[styles.list, className].filter(Boolean).join(' ')}>
      {tags.map((tag) => (
        <span key={tag} className={styles.tag}>
          {t(`contentTags.${tag}`)}
        </span>
      ))}
    </span>
  )
}

export { ContentTagList }
