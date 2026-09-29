import { Globe2, Orbit, Rocket, RotateCcw, Sparkles, X } from 'lucide-react'
import type { Nilable } from 'nfx-ui/types'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { HoverInfo } from '@/elements/universe/scene'
import type { StarSystemConfig, StarSystemPlanetOption } from '@/elements/universe/types'

import { HomeHoverTooltip } from '../HomeHoverTooltip'
import { HomePlanetsPanel } from '../HomePlanetsPanel'
import styles from './HomePlanetHeroMobile.module.css'

type SheetKind = 'galaxy' | 'fleet' | 'planets' | 'hud'

export type HomePlanetHeroMobileProps = {
  systems: StarSystemConfig[]
  focusedSystemId?: string
  setFocusedSystemId: (id: string | undefined) => void
  activeSystem?: StarSystemConfig
  followStarship: Nilable<number>
  onSelectStarship: (laneIndex: number) => void
  starshipShipLabels: readonly string[]
  onReloadWorld: () => void
  selectGalaxyLabel: string
  reflyButtonTitle: string
  panelTitle: string
  followLabel: string
  enterLabel: string
  onFollowPlanet: (planetId: string) => void
  onEnterPlanet: (planet: StarSystemPlanetOption) => void
  hudLabel: string
  hudTitle: string
  hudDescription: string
  hoverInfo: Nilable<HoverInfo>
}

export function HomePlanetHeroMobile({
  systems,
  focusedSystemId,
  setFocusedSystemId,
  activeSystem,
  followStarship,
  onSelectStarship,
  starshipShipLabels,
  onReloadWorld,
  selectGalaxyLabel,
  reflyButtonTitle,
  panelTitle,
  followLabel,
  enterLabel,
  onFollowPlanet,
  onEnterPlanet,
  hudLabel,
  hudTitle,
  hudDescription,
  hoverInfo,
}: HomePlanetHeroMobileProps) {
  const { t } = useTranslation(['WorldPage'])
  const [sheet, setSheet] = useState<SheetKind | null>(null)

  const toggleSheet = (kind: SheetKind) => {
    setSheet((s) => (s === kind ? null : kind))
  }

  const closeSheet = () => setSheet(null)

  useEffect(() => {
    if (sheet == null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSheet(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sheet])

  const sheetTitle = useMemo(() => {
    switch (sheet) {
      case 'galaxy':
        return t('WorldPage:scene.mobileDockGalaxy')
      case 'fleet':
        return t('WorldPage:scene.starshipBarTitle')
      case 'planets':
        return t('WorldPage:scene.planetsPanelTitle')
      case 'hud':
        return t('WorldPage:scene.mobileDockStatus')
      default:
        return ''
    }
  }, [sheet, t])

  const onPickSystem = (id: string) => {
    setFocusedSystemId(id)
    closeSheet()
  }

  return (
    <div className={styles.root}>
      <header className={styles.topBar}>
        <button
          type="button"
          className={styles.galaxyTrigger}
          onClick={() => toggleSheet('galaxy')}
        >
          <Orbit size={18} strokeWidth={2.1} aria-hidden />
          <span className={styles.galaxyTriggerLabel}>
            {activeSystem?.name ?? selectGalaxyLabel}
          </span>
        </button>
        <button
          type="button"
          className={styles.reflyBtn}
          title={reflyButtonTitle}
          aria-label={reflyButtonTitle}
          onClick={onReloadWorld}
        >
          <RotateCcw size={18} strokeWidth={2.1} />
        </button>
      </header>

      <nav className={styles.tabBar} aria-label={t('WorldPage:scene.eyebrow')}>
        <button
          type="button"
          className={`${styles.tab} ${sheet === 'galaxy' ? styles.tabActive : ''}`}
          onClick={() => toggleSheet('galaxy')}
        >
          <Orbit size={20} strokeWidth={2} aria-hidden />
          <span className={styles.tabLabel}>{t('WorldPage:scene.mobileDockGalaxy')}</span>
        </button>
        <button
          type="button"
          className={`${styles.tab} ${sheet === 'fleet' ? styles.tabActive : ''}`}
          onClick={() => toggleSheet('fleet')}
        >
          <Rocket size={20} strokeWidth={2} aria-hidden />
          <span className={styles.tabLabel}>{t('WorldPage:scene.mobileDockFleet')}</span>
        </button>
        <button
          type="button"
          className={`${styles.tab} ${sheet === 'planets' ? styles.tabActive : ''}`}
          onClick={() => toggleSheet('planets')}
        >
          <Globe2 size={20} strokeWidth={2} aria-hidden />
          <span className={styles.tabLabel}>{t('WorldPage:scene.mobileDockPlanets')}</span>
        </button>
        <button
          type="button"
          className={`${styles.tab} ${sheet === 'hud' ? styles.tabActive : ''}`}
          onClick={() => toggleSheet('hud')}
        >
          <Sparkles size={20} strokeWidth={2} aria-hidden />
          <span className={styles.tabLabel}>{t('WorldPage:scene.mobileDockStatus')}</span>
        </button>
      </nav>

      {sheet != null && (
        <>
          <button
            type="button"
            className={styles.scrim}
            aria-label={t('WorldPage:scene.mobileCloseSheet')}
            onClick={closeSheet}
          />
          <div className={styles.sheet} role="dialog" aria-modal="true" aria-labelledby="home-mobile-sheet-title">
            <div className={styles.sheetHeader}>
              <h2 id="home-mobile-sheet-title" className={styles.sheetTitle}>
                {sheetTitle}
              </h2>
              <button
                type="button"
                className={styles.sheetClose}
                onClick={closeSheet}
                aria-label={t('WorldPage:scene.mobileCloseSheet')}
              >
                <X size={20} strokeWidth={2.1} />
              </button>
            </div>
            <div className={styles.sheetBody}>
              {sheet === 'galaxy' && (
                <div className={styles.galaxyList}>
                  {systems.map((system) => (
                    <button
                      key={system.id}
                      type="button"
                      className={`${styles.galaxyRow} ${focusedSystemId === system.id ? styles.galaxyRowActive : ''}`}
                      onClick={() => onPickSystem(system.id)}
                    >
                      <span className={styles.galaxyDot} aria-hidden />
                      <span className={styles.galaxyMeta}>
                        <strong>{system.name}</strong>
                        <span>
                          {system.planets.length} {system.summary}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {sheet === 'fleet' && (
                <div className={styles.fleetList}>
                  {starshipShipLabels.map((label, index) => {
                    const active = followStarship === index
                    return (
                      <button
                        key={`fleet-${index}`}
                        type="button"
                        className={`${styles.fleetRow} ${active ? styles.fleetRowActive : ''}`}
                        onClick={() => {
                          onSelectStarship(index)
                          closeSheet()
                        }}
                      >
                        <span className={styles.fleetDot} aria-hidden />
                        <span className={styles.fleetName}>{label}</span>
                      </button>
                    )
                  })}
                </div>
              )}

              {sheet === 'planets' &&
                (activeSystem?.planets.length ? (
                  <HomePlanetsPanel
                    system={activeSystem}
                    panelTitle={panelTitle}
                    followLabel={followLabel}
                    enterLabel={enterLabel}
                    onFollowPlanet={onFollowPlanet}
                    onEnterPlanet={onEnterPlanet}
                    embedded
                  />
                ) : (
                  <p className={styles.emptyHint}>{t('WorldPage:scene.mobilePickSystemForPlanets')}</p>
                ))}

              {sheet === 'hud' && (
                <div className={styles.statusBlock}>
                  <span className={styles.statusEyebrow}>
                    <Sparkles size={13} strokeWidth={2} aria-hidden />
                    {hudLabel}
                  </span>
                  <p className={styles.statusTitle}>{hudTitle}</p>
                  <p className={styles.statusDesc}>{hudDescription}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <HomeHoverTooltip hoverInfo={hoverInfo} rootClassName={styles.hoverMobile} />
    </div>
  )
}
