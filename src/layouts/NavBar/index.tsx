import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import type { Nullable } from 'nfx-ui/types'

import { gsap, useGSAP } from '@/animations/gsap'
import { navigationItems } from '@/constants/siteContent'
import { routerEventEmitter } from '@/events/router'
import { useReducedMotion } from '@/hooks'
import { ROUTES } from '@/navigations/routes'
import { playWorldTransition } from '@/stores/transitionStore'
import styles from './styles.module.css'

function NavBar() {
  const location = useLocation()
  const { t } = useTranslation(['components', 'WorldPage'])
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<Nullable<HTMLElement>>(null)
  const reduced = useReducedMotion()
  const [clock, setClock] = useState('')

  useEffect(() => {
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat('en-CA', {
          timeZone: 'America/Vancouver',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()),
      )
    }
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  useGSAP(
    () => {
      if (reduced) return

      gsap.fromTo(
        '[data-nav-progress]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          transformOrigin: 'left center',
          scrollTrigger: { start: 0, end: 'max', scrub: true, invalidateOnRefresh: true },
        },
      )
    },
    { scope: headerRef, dependencies: [reduced, location.pathname] },
  )

  const handleNavigate = (path: string, labelKey: string) => {
    if (path === location.pathname) {
      setMenuOpen(false)
      return
    }

    playWorldTransition({
      type: 'page',
      page: path,
      title: t(labelKey),
      subtitle: t('labels.worldShift'),
      action: () => {
        routerEventEmitter.navigate({ to: path })
        setMenuOpen(false)
      },
    })
  }

  const handleBrandHome = () => {
    if (location.pathname === ROUTES.INTRO) return
    playWorldTransition({
      type: 'page',
      page: ROUTES.INTRO,
      title: t('navigation.intro'),
      subtitle: t('labels.worldShift'),
      action: () => routerEventEmitter.navigate({ to: ROUTES.INTRO }),
    })
  }

  return (
    <>
      <header
        ref={headerRef}
        className={styles.header}
        data-overlay={location.pathname === ROUTES.WORLD ? 'true' : undefined}
      >
        <button type="button" className={styles.brand} onClick={handleBrandHome}>
          <span className={styles.brandStar} aria-hidden>
            ✦
          </span>
          <span className={styles.brandName}>{t('brand.title')}</span>
          <span className={styles.brandTag}>/ {t('navigation.world')}</span>
        </button>

        <nav className={styles.nav} aria-label="Primary">
          {navigationItems.map((item, index) => {
            const active = location.pathname === item.path

            return (
              <button
                key={item.path}
                type="button"
                className={`${styles.navLink} ${active ? styles.activeLink : ''}`}
                onClick={() => handleNavigate(item.path, item.labelKey)}
              >
                <span className={styles.linkIndex}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.linkRoll}>
                  <span className={styles.linkLabel}>{t(item.labelKey)}</span>
                  <span className={styles.linkLabel} aria-hidden>
                    {t(item.labelKey)}
                  </span>
                </span>
                <span className={styles.linkDot} aria-hidden />
              </button>
            )
          })}
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-label={t('accessibility.toggleNavigation')}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <span className={styles.instrument} suppressHydrationWarning>
          <span className={styles.instrumentDot} aria-hidden />
          {clock} · VAN
        </span>

        <span className={styles.progress} aria-hidden>
          <span data-nav-progress />
        </span>
      </header>

      {menuOpen ? (
        <div className={styles.mobileMenu}>
          {navigationItems.map((item, index) => (
            <button
              key={item.path}
              className={`${styles.mobileLink} ${location.pathname === item.path ? styles.mobileActive : ''}`}
              type="button"
              style={{ animationDelay: `${index * 70}ms` }}
              onClick={() => handleNavigate(item.path, item.labelKey)}
            >
              <span className={styles.mobileIndex}>{String(index + 1).padStart(2, '0')}</span>
              {t(item.labelKey)}
            </button>
          ))}
        </div>
      ) : null}
    </>
  )
}

export { NavBar }
