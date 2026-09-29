const MANIFESTO_VISUAL_IN = 0.34
const MANIFESTO_TEXT_IN = 0.28
const MANIFESTO_WORDS_IN = 0.3
const MANIFESTO_EXIT = 0.26
const MANIFESTO_SEG =
  MANIFESTO_VISUAL_IN + MANIFESTO_TEXT_IN + MANIFESTO_WORDS_IN + MANIFESTO_EXIT

function getWallScrollDistance(track: HTMLElement) {
  return Math.max(0, track.scrollWidth - window.innerWidth)
}

function getManifestoScrollDistance(slideCount: number) {
  return slideCount * MANIFESTO_SEG * window.innerHeight * 0.92
}

function getJourneyScrollDistance(canvas: HTMLElement) {
  const dx = Math.max(0, canvas.offsetWidth - window.innerWidth)
  const dy = Math.max(0, canvas.offsetHeight - window.innerHeight)
  return dx + dy
}

export {
  MANIFESTO_EXIT,
  MANIFESTO_SEG,
  MANIFESTO_TEXT_IN,
  MANIFESTO_VISUAL_IN,
  MANIFESTO_WORDS_IN,
  getJourneyScrollDistance,
  getManifestoScrollDistance,
  getWallScrollDistance,
}
