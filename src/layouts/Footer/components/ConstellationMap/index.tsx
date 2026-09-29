import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { Nullable } from 'nfx-ui/types'

import { gsap, useGSAP } from '@/animations/gsap'
import { worldPillars } from '@/constants/siteContent'
import { routerEventEmitter } from '@/events/router'
import { useReducedMotion } from '@/hooks'

import { PLANETS, PlanetGraphic } from './planets'
import styles from './styles.module.css'

const SUN = { cx: 56, cy: 100 }

function ConstellationMap() {
  const rootRef = useRef<Nullable<HTMLElement>>(null)
  const { t } = useTranslation(['components', 'WorldPage'])
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root || reduced) return

      gsap.fromTo(
        root.querySelectorAll('[data-orbit-path]'),
        { strokeDashoffset: 80, opacity: 0.15 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: {
            trigger: root,
            start: 'top 88%',
            end: 'bottom 70%',
            scrub: true,
          },
        },
      )

      gsap.from(root.querySelectorAll('[data-planet-group]'), {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.07,
        scrollTrigger: { trigger: root, start: 'top 86%', once: true },
      })

      // identity — ripple rings (attr r, always animating)
      root.querySelectorAll('[data-planet="identity"] [data-pulse]').forEach((ring, i) => {
        const bases = [6, 10, 14]
        const base = bases[i] ?? 8
        gsap.fromTo(
          ring,
          { attr: { r: base }, opacity: 0.55 },
          {
            attr: { r: base + 5 },
            opacity: 0.08,
            duration: 2 + i * 0.45,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.35,
          },
        )
      })

      gsap.to(root.querySelectorAll('[data-planet="work"] [data-spin]'), {
        rotation: 360,
        duration: 22,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
      })

      gsap.to(root.querySelectorAll('[data-planet="records"] [data-ring]'), {
        scaleY: 0.45,
        opacity: 0.35,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5,
        transformOrigin: 'center center',
      })

      root.querySelectorAll('[data-planet="experience"] [data-orbit-particle]').forEach((dot, i) => {
        gsap.to(dot, {
          opacity: 0.25,
          duration: 0.9 + i * 0.18,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.12,
        })
      })

      gsap.to(root.querySelector('[data-planet="experience"] [data-orbit-guide]'), {
        strokeDashoffset: -36,
        duration: 10,
        repeat: -1,
        ease: 'none',
      })

      gsap.to(root.querySelectorAll('[data-planet="contact"] [data-comet-tail]'), {
        opacity: 0.2,
        duration: 1.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2,
      })

      gsap.to(root.querySelector('[data-sun-corona]'), {
        attr: { r: 20 },
        opacity: 0.15,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(root.querySelector('[data-chart-star]'), {
        opacity: 0.3,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.22, from: 'random' },
      })
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section ref={rootRef} className={styles.root} aria-label={t('labels.worldMap')}>
      <p className={styles.label}>{t('labels.worldMap')}</p>

      <svg className={styles.svg} viewBox="0 0 960 200" role="img">
        {/* right-rail star chart — fills dead space */}
        <g className={styles.chartRail} aria-hidden>
          <rect x="748" y="24" width="196" height="152" fill="none" strokeWidth="0.55" />
          <line x1="748" y1="48" x2="944" y2="48" strokeWidth="0.4" />
          <text x="760" y="40" className={styles.chartLabel}>
            SECTOR GRID · LSR
          </text>
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={`cg-${i}`}
              x1="760"
              y1={56 + i * 28}
              x2="932"
              y2={56 + i * 28}
              strokeWidth="0.35"
              opacity="0.6"
            />
          ))}
          {[
            [780, 68],
            [820, 92],
            [860, 72],
            [900, 110],
            [820, 130],
            [880, 148],
          ].map(([cx, cy], i) => (
            <g key={i} transform={`translate(${cx} ${cy})`} data-chart-star>
              <line x1="-3" y1="0" x2="3" y2="0" strokeWidth="0.45" />
              <line x1="0" y1="-3" x2="0" y2="3" strokeWidth="0.45" />
            </g>
          ))}
          <path
            d="M 768 160 Q 820 120, 872 88 T 928 56"
            fill="none"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            opacity="0.55"
          />
          <text x="760" y="182" className={styles.chartLabel}>
            123.12°W · 49.28°N · VAN
          </text>
        </g>

        <g className={styles.sun} transform={`translate(${SUN.cx} ${SUN.cy})`}>
          <circle r="16" className={styles.sunCorona} data-sun-corona />
          <circle r="5" className={styles.sunCore} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="-10"
              x2="0"
              y2="-18"
              className={styles.sunRay}
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {PLANETS.map((planet) => (
          <ellipse
            key={`orbit-${planet.id}`}
            cx={SUN.cx}
            cy={SUN.cy}
            rx={planet.orbitRx}
            ry={planet.orbitRy}
            className={styles.orbitPath}
            data-orbit-path
            transform={`rotate(${planet.id === 'work' ? -10 : planet.id === 'contact' ? 6 : 0} ${SUN.cx} ${SUN.cy})`}
          />
        ))}

        {PLANETS.map((planet) => {
          const pillar = worldPillars.find((p) => p.id === planet.id)
          if (!pillar) return null
          const label = t(`WorldPage:pillars.${planet.id}.title`)

          return (
            <g
              key={planet.id}
              className={styles.planetGroup}
              data-planet-group
              data-planet={planet.id}
              transform={`translate(${planet.cx} ${planet.cy})`}
              role="link"
              tabIndex={0}
              aria-label={label}
              onClick={() => routerEventEmitter.navigate({ to: pillar.path })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  routerEventEmitter.navigate({ to: pillar.path })
                }
              }}
            >
              <g className={styles.planetArt}>
                <PlanetGraphic id={planet.id} />
              </g>
              <text y={planet.labelOffsetY} className={styles.planetLabel} textAnchor="middle">
                {label}
              </text>
            </g>
          )
        })}
      </svg>

      <ul className={styles.mobileNav}>
        {worldPillars.map((pillar) => (
          <li key={pillar.id}>
            <button
              type="button"
              className={styles.mobileLink}
              onClick={() => routerEventEmitter.navigate({ to: pillar.path })}
            >
              {t(`WorldPage:pillars.${pillar.id}.title`)}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export { ConstellationMap }
