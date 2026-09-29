import { SplitReveal } from '@/animations'
import { ContentTagList } from '@/components/ContentTagList'
import type { ContentTag } from '@/enums'

import styles from './styles.module.css'

type FooterSignatureProps = {
  name: string
  subtitleTags: ContentTag[]
}

function FooterSignature({ name, subtitleTags }: FooterSignatureProps) {
  return (
    <div className={styles.root} data-footer-signature>
      <p className={styles.eyebrow}>Pilot signature</p>
      <SplitReveal as="h2" split="chars" scroll className={styles.name}>
        {name}
      </SplitReveal>
      <p className={styles.subtitle} data-footer-subtitle>
        <ContentTagList tags={subtitleTags} />
      </p>
    </div>
  )
}

export { FooterSignature }
