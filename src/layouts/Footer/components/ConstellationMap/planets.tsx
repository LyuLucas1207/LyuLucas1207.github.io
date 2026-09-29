export type PlanetId = 'identity' | 'work' | 'records' | 'experience' | 'contact'

export type PlanetSpec = {
  id: PlanetId
  cx: number
  cy: number
  orbitRx: number
  orbitRy: number
  labelOffsetY: number
}

/** Full-width sketch layout — viewBox 0 0 960 200 */
export const PLANETS: PlanetSpec[] = [
  { id: 'identity', cx: 148, cy: 108, orbitRx: 52, orbitRy: 28, labelOffsetY: 22 },
  { id: 'work', cx: 268, cy: 78, orbitRx: 68, orbitRy: 36, labelOffsetY: 20 },
  { id: 'records', cx: 408, cy: 122, orbitRx: 84, orbitRy: 42, labelOffsetY: 22 },
  { id: 'experience', cx: 548, cy: 74, orbitRx: 98, orbitRy: 48, labelOffsetY: 20 },
  { id: 'contact', cx: 688, cy: 128, orbitRx: 112, orbitRy: 52, labelOffsetY: 18 },
]

type PlanetGraphicProps = {
  id: PlanetId
}

/** Minimal line-art planets — stroke only, no cartoon fills. */
function PlanetGraphic({ id }: PlanetGraphicProps) {
  switch (id) {
    case 'identity':
      return (
        <>
          <circle r="6" className="sketch-pulse" data-pulse data-pulse-a />
          <circle r="10" className="sketch-pulse" data-pulse data-pulse-b />
          <circle r="14" className="sketch-pulse faint" data-pulse data-pulse-c />
          <circle r="3" className="sketch-core" />
          <line x1="-5" y1="0" x2="5" y2="0" className="sketch-cross" />
          <line x1="0" y1="-5" x2="0" y2="5" className="sketch-cross" />
        </>
      )
    case 'work':
      return (
        <>
          <rect x="-8" y="-8" width="16" height="16" className="sketch-core" data-spin />
          <path d="M-12 -12 L12 -12 L12 12 L-12 12 Z" className="sketch-frame" data-spin />
          <line x1="-12" y1="0" x2="12" y2="0" className="sketch-tick" data-spin />
          <line x1="0" y1="-12" x2="0" y2="12" className="sketch-tick" data-spin />
        </>
      )
    case 'records':
      return (
        <>
          <circle r="7" className="sketch-core" />
          <ellipse rx="13" ry="4" className="sketch-ring" data-ring />
          <ellipse rx="13" ry="4" className="sketch-ring faint" data-ring transform="rotate(28)" />
        </>
      )
    case 'experience':
      return (
        <>
          <circle r="6" className="sketch-core" />
          <circle r="15" className="sketch-orbit" data-orbit-guide />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <circle
              key={deg}
              r="1.2"
              className="sketch-dot"
              data-orbit-particle
              transform={`rotate(${deg}) translate(15 0)`}
            />
          ))}
        </>
      )
    case 'contact':
      return (
        <>
          <circle r="3.5" className="sketch-core" />
          <path d="M-32 2 Q-16 -2 0 0" className="sketch-tail" data-comet-tail />
          <path d="M-26 5 Q-12 2 4 3" className="sketch-tail faint" data-comet-tail />
          <path d="M-20 7 Q-8 5 8 6" className="sketch-tail faint" data-comet-tail />
        </>
      )
    default:
      return null
  }
}

export { PlanetGraphic }
