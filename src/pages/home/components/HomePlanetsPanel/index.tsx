import type { StarSystemConfig, StarSystemPlanetOption } from '@/elements/universe/types'

import styles from './styles.module.css'

type Props = {
  system: StarSystemConfig | undefined
  panelTitle: string
  followLabel: string
  enterLabel: string
  onFollowPlanet: (planetId: string) => void
  onEnterPlanet: (planet: StarSystemPlanetOption) => void
  /** 嵌入底部抽屉等：取消绝对定位，由父级控制滚动区域 */
  embedded?: boolean
}

export function HomePlanetsPanel({
  system,
  panelTitle,
  followLabel,
  enterLabel,
  onFollowPlanet,
  onEnterPlanet,
  embedded = false,
}: Props) {
  if (!system?.planets.length) return null

  return (
    <aside
      className={embedded ? styles.panelEmbedded : styles.panel}
      aria-label={panelTitle}
    >
      <p className={styles.eyebrow}>{panelTitle}</p>
      <p className={styles.systemName}>{system.name}</p>
      <ul className={styles.list}>
        {system.planets.map((planet) => (
          <li key={planet.id} className={styles.row}>
            <span className={styles.planetLabel}>{planet.label}</span>
            <span className={styles.actions}>
              <button
                type="button"
                className={styles.chip}
                onClick={() => onFollowPlanet(planet.id)}
              >
                {followLabel}
              </button>
              <button
                type="button"
                className={styles.chipPrimary}
                onClick={() => onEnterPlanet(planet)}
              >
                {enterLabel}
              </button>
            </span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
