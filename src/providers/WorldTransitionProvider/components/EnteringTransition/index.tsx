import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useTheme } from 'nfx-ui/themes'
import type { Nullable } from 'nfx-ui/types'

import { prefetchWorldEntryAssets } from '@/elements/universe/utils/prefetchWorldEntry'
import { ROUTES } from '@/navigations/routes'
import { consumeWorldEntryHandledByPageTransition, useTransitionStore } from '@/stores/transitionStore'
import gsap from 'gsap'
import { scheduleBrowserIdleTask } from 'nfx-ui/utils'

import { PageMoodGraphics } from '../PageMoodGraphics'
import styles from '../PageTransitionOverlay/styles.module.css'

/**
 * 冷启动 / 刷新落在 Intro 时播开屏：轨迹从 0 描到完整，再收口。
 * 与 `PageTransitionOverlay` 解耦；经页面过场进入 Intro 时由 store 标记，避免再播一遍开屏。
 */
export function EnteringTransition() {
  const location = useLocation()
  const request = useTransitionStore((s) => s.request)
  const endingRefly = useTransitionStore((s) => s.endingRefly)
  const { t } = useTranslation(['components', 'WorldPage'])
  const { currentTheme } = useTheme()
  const ref = useRef<Nullable<HTMLDivElement>>(null)
  const [done, setDone] = useState(false)

  const isEntry = location.pathname === ROUTES.INTRO
  const showOverlay = isEntry && !done && request === null && !endingRefly

  const shellBackground = useMemo(() => {
    const vars = currentTheme.colors.variables as unknown as Record<string, string | undefined>
    const bg2 = vars.bg2 ?? 'rgba(10, 10, 14, 1)'
    const bg3 = vars.bg3 ?? 'rgba(6, 6, 10, 1)'
    const glow = vars.primaryTransparent ?? 'rgba(255, 255, 255, 0.16)'
    return `radial-gradient(circle at center, ${glow}, transparent 30%),linear-gradient(180deg, ${bg3}, ${bg2})`
  }, [currentTheme])

  useLayoutEffect(() => {
    if (consumeWorldEntryHandledByPageTransition()) {
      setDone(true)
    }
  }, [location.pathname, request])

  useLayoutEffect(() => {
    if (request !== null && isEntry) {
      setDone(true)
    }
  }, [request, isEntry])

  useLayoutEffect(() => {
    if (!showOverlay) return
    const node = ref.current
    if (!node) return

    const shell = node.querySelector<HTMLElement>('[data-overlay-shell]')
    const veil = node.querySelector<HTMLElement>('[data-overlay-veil]')
    const paths = node.querySelectorAll<SVGGeometryElement>('[data-overlay-draw]')
    const dots = node.querySelectorAll<SVGElement>('[data-overlay-dot]')
    const copy = node.querySelectorAll<HTMLElement>('[data-overlay-copy]')

    if (!shell || !veil) return

    let cancelled = false
    let drawDone = false
    let prefetchDone = false
    let drawTween: Nullable<gsap.core.Timeline> = null
    let exitTween: Nullable<gsap.core.Timeline> = null
    let idleExit: { cancel: () => void } | null = null

    paths.forEach((path) => {
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    })
    gsap.set(node, { autoAlpha: 0 })
    gsap.set(shell, { clipPath: 'circle(0% at 50% 50%)', opacity: 0.92 })
    gsap.set(dots, { opacity: 0, scale: 0.45, transformOrigin: 'center center' })
    gsap.set(copy, { opacity: 0, y: 22, filter: 'blur(12px)' })
    gsap.set(veil, { opacity: 0, scale: 1, transformOrigin: 'center center' })

    const playExit = () => {
      if (cancelled || !drawDone || !prefetchDone) return
      idleExit?.cancel()
      idleExit = scheduleBrowserIdleTask(() => {
        if (cancelled) return
        exitTween = gsap
          .timeline({
            onComplete: () => {
              if (!cancelled) setDone(true)
            },
          })
          .to(copy, { opacity: 0, y: -16, duration: 0.32, stagger: 0.04, ease: 'power2.in' })
          .to(
            shell,
            { clipPath: 'circle(0% at 50% 50%)', opacity: 0, duration: 0.82, ease: 'power4.inOut' },
            '-=0.08',
          )
          .set(node, { autoAlpha: 0 })
      })
    }

    drawTween = gsap
      .timeline({
        onComplete: () => {
          drawDone = true
          playExit()
        },
      })
      .set(node, { autoAlpha: 1 })
      .fromTo(
        shell,
        { clipPath: 'circle(0% at 50% 50%)', opacity: 0.92 },
        { clipPath: 'circle(78% at 50% 50%)', opacity: 1, duration: 0.9, ease: 'power4.inOut' },
      )
      .fromTo(
        paths,
        { strokeDashoffset: (_, target) => (target as SVGGeometryElement).getTotalLength() },
        { strokeDashoffset: 0, duration: 0.95, stagger: 0.08, ease: 'power3.out' },
        '-=0.35',
      )
      .fromTo(
        dots,
        { opacity: 0, scale: 0.45, transformOrigin: 'center center' },
        { opacity: 1, scale: 1, duration: 0.45, stagger: 0.05, ease: 'back.out(2)' },
        '-=0.55',
      )
      .fromTo(
        copy,
        { opacity: 0, y: 22, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, stagger: 0.06, ease: 'power3.out' },
        '-=0.46',
      )
      .to(
        veil,
        { opacity: 0.24, scale: 1.06, transformOrigin: 'center center', duration: 0.7, ease: 'sine.inOut' },
        '<',
      )

    void prefetchWorldEntryAssets().then(() => {
      if (cancelled) return
      prefetchDone = true
      playExit()
    })

    return () => {
      cancelled = true
      idleExit?.cancel()
      drawTween?.kill()
      exitTween?.kill()
    }
  }, [showOverlay])

  if (!showOverlay) return null

  return (
    <div ref={ref} className={styles.root}>
      <div className={styles.shell} style={{ background: shellBackground }} data-overlay-shell>
        <div className={styles.veil} data-overlay-veil />
        <div className={styles.copy}>
          <p data-overlay-copy>{t('brand.title')}</p>
          <span data-overlay-copy>{t('brand.subtitle')}</span>
        </div>
        <div className={styles.graphic}>
          <PageMoodGraphics page={ROUTES.WORLD} className={styles.svg} />
        </div>
      </div>
    </div>
  )
}
