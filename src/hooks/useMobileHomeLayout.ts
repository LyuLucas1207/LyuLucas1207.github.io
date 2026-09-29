import { useSyncExternalStore } from 'react'

/** 与 `HomePlanetHeroMobile` / CSS 手机布局一致：≤640px 视为手机壳层 */
const MOBILE_HOME_QUERY = '(max-width: 640px)'

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(MOBILE_HOME_QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

function getSnapshot() {
  return window.matchMedia(MOBILE_HOME_QUERY).matches
}

function getServerSnapshot() {
  return false
}

export function useMobileHomeLayout() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
