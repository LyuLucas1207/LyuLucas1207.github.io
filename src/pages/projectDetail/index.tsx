import { ArrowLeft, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router-dom'

import { FieldGridBackdrop } from '@/components/FieldGridBackdrop'
import { IconChip } from '@/components/IconChip'
import { routerEventEmitter } from '@/events/router'
import { useProjectsQuery } from '@/hooks'

import styles from './styles.module.css'

function ProjectDetailPage() {
  const { slug } = useParams()
  const { t } = useTranslation(['components', 'ProjectsPage'])
  const { data: projects = [] } = useProjectsQuery()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <article className={styles.page} data-accent={project.accent}>
      <button
        type="button"
        className={styles.back}
        onClick={() => routerEventEmitter.navigateToProjects()}
      >
        <IconChip icon={ArrowLeft} size={16} className={styles.backIcon} />
        {t('actions.backToProjects')}
      </button>

      <header className={styles.hero}>
        <FieldGridBackdrop className={styles.heroField} />
        <div className={styles.heroGlow} aria-hidden />
        <div className={styles.heroInner}>
          <p className={styles.kicker}>
            {t(`projectCategories.${project.category}`)} · {project.year}
          </p>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>
          <div className={styles.heroLinks}>
            <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
              <IconChip icon={ExternalLink} size={14} className={styles.linkIcon} />
              {t('ProjectsPage:copy.repository')}
            </a>
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <IconChip icon={ExternalLink} size={14} className={styles.linkIcon} />
                {t('ProjectsPage:copy.relatedLink')}
              </a>
            ) : null}
          </div>
        </div>
      </header>

      <section className={styles.metaBand} aria-label={t('labels.role')}>
        <dl className={styles.metaGrid}>
          <div>
            <dt>{t('labels.role')}</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>{t('labels.impact')}</dt>
            <dd>{project.impact}</dd>
          </div>
        </dl>
        <div className={styles.stackBlock}>
          <span className={styles.stackLabel}>{t('labels.stack')}</span>
          <div className={styles.stack}>
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.storyGrid}>
        <section className={styles.storyPanel}>
          <h2 className={styles.panelTitle}>{t('labels.challenge')}</h2>
          <p className={styles.panelBody}>{project.challenge}</p>
        </section>
        <section className={styles.storyPanel}>
          <h2 className={styles.panelTitle}>{t('labels.outcome')}</h2>
          <p className={styles.panelBody}>{project.outcome}</p>
        </section>
      </div>

      <section className={styles.deepDive}>
        <h2 className={styles.panelTitle}>{t('labels.implementationDetails')}</h2>
        <ul className={styles.detailList}>
          {project.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}

export { ProjectDetailPage }
