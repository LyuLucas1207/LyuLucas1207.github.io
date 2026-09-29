import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowUpRight, Send } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { Nullable } from 'nfx-ui/types'
import { z } from 'zod'

import { gsap, ScrollTrigger, useGSAP } from '@/animations/gsap'
import { Magnetic } from '@/animations'
import { IconChip } from '@/components/IconChip'
import { ContactBeaconHero } from './components/ContactBeaconHero'
import { useProfileQuery, useReducedMotion } from '@/hooks'

import styles from './styles.module.css'

type ContactFormValues = {
  name: string
  email: string
  company?: string
  message: string
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const { t } = useTranslation(['components', 'ContactPage'])
  const { data: profile } = useProfileQuery()
  const rootRef = useRef<Nullable<HTMLDivElement>>(null)
  const reduced = useReducedMotion()

  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('contactForm.errors.name')),
        email: z.string().email(t('contactForm.errors.email')),
        company: z.string().optional(),
        message: z.string().min(24, t('contactForm.errors.message')),
      }),
    [t],
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', company: '', message: '' },
  })

  const onSubmit = handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 700))
    setSubmitted(true)
    reset()
  })

  const methods = profile?.contactMethods ?? []

  useGSAP(
    () => {
      const node = rootRef.current
      if (!node || reduced) return

      node.querySelectorAll('[data-method-row]').forEach((row, index) => {
        gsap.from(row, {
          opacity: 0,
          y: 48,
          duration: 1,
          delay: index * 0.06,
          ease: 'power4.out',
          scrollTrigger: { trigger: row, start: 'top 90%', once: true },
        })
      })

      gsap.from('[data-form-field]', {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-form]', start: 'top 82%', once: true },
      })

      gsap.fromTo(
        '[data-signal-path]',
        { drawSVG: '0%' },
        {
          drawSVG: '100%',
          ease: 'none',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '[data-signal]',
            start: 'top 95%',
            end: 'bottom 40%',
            scrub: true,
          },
        },
      )

      ScrollTrigger.refresh()
    },
    { scope: rootRef, dependencies: [reduced, methods.length] },
  )

  const nameField = register('name')
  const emailField = register('email')
  const companyField = register('company')
  const messageField = register('message')

  return (
    <div ref={rootRef} className={styles.page}>
      <ContactBeaconHero />

      <svg
        className={styles.signal}
        data-signal
        viewBox="0 0 1200 120"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          data-signal-path
          d="M0 60 Q 75 10, 150 60 T 300 60 T 450 60 T 600 60 T 750 60 T 900 60 T 1050 60 T 1200 60"
          stroke="rgba(var(--color-primary-rgb), 0.55)"
          strokeWidth="1.4"
        />
        <path
          data-signal-path
          d="M0 60 Q 75 110, 150 60 T 300 60 T 450 60 T 600 60 T 750 60 T 900 60 T 1050 60 T 1200 60"
          stroke="rgba(var(--color-primary-rgb), 0.25)"
          strokeWidth="1"
        />
      </svg>

      <section
        className={styles.methods}
        aria-label={t('labels.reachOutDirectly')}
      >
        <p className={styles.methodsLabel}>{t('labels.reachOutDirectly')}</p>
        {methods.map((method) => (
          <a
            key={method.label}
            href={method.href}
            className={styles.methodRow}
            data-method-row
          >
            <span className={styles.methodLabel}>{method.label}</span>
            <strong className={styles.methodValue}>{method.value}</strong>
            <span className={styles.methodArrow} aria-hidden>
              <IconChip icon={ArrowUpRight} size={22} className={styles.methodArrowIcon} />
            </span>
            <span className={styles.methodFill} aria-hidden />
          </a>
        ))}
      </section>

      <section className={styles.formSection}>
        <form className={styles.form} onSubmit={onSubmit} data-form>
          <div className={styles.fieldRow}>
            <div className={styles.field} data-form-field>
              <label htmlFor="contact-name">{t('contactForm.name')}</label>
              <input
                id="contact-name"
                placeholder={t('contactForm.namePlaceholder')}
                autoComplete="name"
                {...nameField}
              />
              {errors.name ? (
                <p className={styles.error}>{errors.name.message}</p>
              ) : null}
            </div>
            <div className={styles.field} data-form-field>
              <label htmlFor="contact-email">{t('contactForm.email')}</label>
              <input
                id="contact-email"
                type="email"
                placeholder={t('contactForm.emailPlaceholder')}
                autoComplete="email"
                {...emailField}
              />
              {errors.email ? (
                <p className={styles.error}>{errors.email.message}</p>
              ) : null}
            </div>
          </div>

          <div className={styles.field} data-form-field>
            <label htmlFor="contact-company">{t('contactForm.company')}</label>
            <input
              id="contact-company"
              placeholder={t('contactForm.companyPlaceholder')}
              autoComplete="organization"
              {...companyField}
            />
            {errors.company ? (
              <p className={styles.error}>{errors.company.message}</p>
            ) : null}
          </div>

          <div className={styles.field} data-form-field>
            <label htmlFor="contact-message">{t('contactForm.message')}</label>
            <textarea
              id="contact-message"
              rows={6}
              placeholder={t('contactForm.messagePlaceholder')}
              {...messageField}
            />
            {errors.message ? (
              <p className={styles.error}>{errors.message.message}</p>
            ) : null}
          </div>

          <div className={styles.submitRow} data-form-field>
            <Magnetic className={styles.submitMagnetic}>
              <button
                type="submit"
                className={styles.submit}
                disabled={isSubmitting}
              >
                <IconChip icon={Send} size={15} className={styles.submitIcon} />
                {t('actions.sendInquiry')}
              </button>
            </Magnetic>
            {submitted ? (
              <p className={styles.success} role="status">
                {t('contactForm.success')}
              </p>
            ) : null}
          </div>
        </form>
      </section>
    </div>
  )
}

export { ContactPage }
