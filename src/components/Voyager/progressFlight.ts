import { gsap, ScrollTrigger } from '@/animations/gsap'

type VhPoint = { x: number; y: number }

type ArcSample = { u: number; len: number }

type BodyPose = {
  scale: number
  z: number
  rotationX: number
  rotationY: number
  opacity: number
  filter: string
}

export type VoyagerFlightPlan = {
  pathname: string
  start: VhPoint
  end: VhPoint
  curvePoints: VhPoint[]
  arcTable: ArcSample[]
  totalLength: number
  maxScroll: number
  knotCount: number
}

type CurveComplexity = {
  knotCount: number
  arcSamples: number
}

function readMaxScroll() {
  return Math.max(ScrollTrigger.maxScroll(window), 0)
}

/** Long pages → more zig-zag segments; arc samples scale with path length. */
function curveComplexityFromMaxScroll(maxScroll: number): CurveComplexity {
  const vh = window.innerHeight
  const pages = maxScroll / Math.max(vh, 1)

  return {
    knotCount: Math.round(clamp(2 + pages * 0.5, 2, 9)),
    arcSamples: Math.round(clamp(180 + pages * 28, 180, 480)),
  }
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function clamp01(t: number) {
  return Math.min(1, Math.max(0, t))
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function radToDeg(rad: number) {
  return (rad * 180) / Math.PI
}

function randRange(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function dist(a: VhPoint, b: VhPoint) {
  return Math.hypot(b.x - a.x, b.y - a.y)
}

function lerpPoint(t: number, ta: number, a: VhPoint, tb: number, b: VhPoint): VhPoint {
  if (Math.abs(tb - ta) < 1e-8) return { ...a }
  const u = (t - ta) / (tb - ta)
  return { x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u) }
}

/** Centripetal Catmull–Rom spline — smooth cubic arcs through control points. */
function catmullRomCentripetal(p0: VhPoint, p1: VhPoint, p2: VhPoint, p3: VhPoint, t: number, alpha = 0.35): VhPoint {
  const t0 = 0
  const t1 = t0 + Math.pow(Math.max(dist(p0, p1), 0.001), alpha)
  const t2 = t1 + Math.pow(Math.max(dist(p1, p2), 0.001), alpha)
  const t3 = t2 + Math.pow(Math.max(dist(p2, p3), 0.001), alpha)
  const target = lerp(t1, t2, clamp01(t))

  const a1 = lerpPoint(target, t0, p0, t1, p1)
  const a2 = lerpPoint(target, t1, p1, t2, p2)
  const a3 = lerpPoint(target, t2, p2, t3, p3)
  const b1 = lerpPoint(target, t0, a1, t2, a2)
  const b2 = lerpPoint(target, t1, a2, t3, a3)

  return lerpPoint(target, t1, b1, t2, b2)
}

function extrapolate(from: VhPoint, toward: VhPoint, back: number): VhPoint {
  return { x: from.x + (from.x - toward.x) * back, y: from.y + (from.y - toward.y) * back }
}

/** Phantom end caps so the spline eases in/out of start & end instead of kinking. */
function expandForSpline(points: VhPoint[]): VhPoint[] {
  if (points.length < 2) return points
  return [
    extrapolate(points[0], points[1], 0.55),
    ...points,
    extrapolate(points[points.length - 1], points[points.length - 2], 0.55),
  ]
}

function sampleCurve(points: VhPoint[], u: number): VhPoint {
  const path = expandForSpline(points)
  const segCount = path.length - 1
  if (segCount <= 0) return path[0] ?? { x: 50, y: 50 }

  const scaled = clamp01(u) * segCount
  const segIndex = Math.min(Math.floor(scaled), segCount - 1)
  const localT = scaled - segIndex

  const p0 = path[Math.max(0, segIndex - 1)]
  const p1 = path[segIndex]
  const p2 = path[segIndex + 1]
  const p3 = path[Math.min(path.length - 1, segIndex + 2)]

  return catmullRomCentripetal(p0, p1, p2, p3, localT)
}

/** Left / right 40% bands — middle 20% stays empty. */
const LEFT_X = { min: 3, max: 40 } as const
const RIGHT_X = { min: 60, max: 97 } as const

function pickSideX(onLeft: boolean) {
  const band = onLeft ? LEFT_X : RIGHT_X
  return randRange(band.min, band.max)
}

/** Spread Y evenly per side, random within each band — avoids vertical clumping. */
function stratifiedY(count: number, yMin: number, yMax: number): number[] {
  if (count <= 0) return []

  const span = yMax - yMin
  const ys = Array.from({ length: count }, (_, i) => {
    const segMin = yMin + (span * i) / count
    const segMax = yMin + (span * (i + 1)) / count
    return randRange(segMin, segMax)
  })

  for (let i = ys.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[ys[i], ys[j]] = [ys[j], ys[i]]
  }

  return ys
}

/**
 * Middle knots: X alternates left-40% / right-40%; Y stratified per side (not global sort).
 * Spline follows generation order 1 → 2 → 3 …
 */
function buildScribbleKnots(start: VhPoint, end: VhPoint, complexity: CurveComplexity): VhPoint[] {
  const { knotCount } = complexity
  const yMin = Math.min(start.y, end.y) + 4
  const yMax = Math.max(start.y, end.y) - 4
  const startOnLeft = start.x <= 40

  let leftCount = 0
  let rightCount = 0
  for (let i = 0; i < knotCount; i += 1) {
    const onLeft = startOnLeft ? i % 2 === 1 : i % 2 === 0
    if (onLeft) leftCount += 1
    else rightCount += 1
  }

  const leftYs = stratifiedY(leftCount, yMin, yMax)
  const rightYs = stratifiedY(rightCount, yMin, yMax)
  let leftIdx = 0
  let rightIdx = 0

  const middle: VhPoint[] = []

  for (let i = 0; i < knotCount; i += 1) {
    const onLeft = startOnLeft ? i % 2 === 1 : i % 2 === 0

    middle.push({
      x: pickSideX(onLeft),
      y: onLeft ? leftYs[leftIdx++]! : rightYs[rightIdx++]!,
    })
  }

  return [start, ...middle, end]
}

function buildArcTable(points: VhPoint[], sampleCount: number): { arcTable: ArcSample[]; totalLength: number } {
  const arcTable: ArcSample[] = [{ u: 0, len: 0 }]
  let totalLength = 0
  let prev = sampleCurve(points, 0)

  for (let i = 1; i <= sampleCount; i += 1) {
    const u = i / sampleCount
    const next = sampleCurve(points, u)
    totalLength += dist(prev, next)
    arcTable.push({ u, len: totalLength })
    prev = next
  }

  return { arcTable, totalLength: Math.max(totalLength, 1) }
}

function sampleAtArcProgress(plan: VoyagerFlightPlan, progress: number): VhPoint {
  const target = clamp01(progress) * plan.totalLength
  const { arcTable } = plan

  if (target <= 0) return sampleCurve(plan.curvePoints, 0)
  if (target >= plan.totalLength) return sampleCurve(plan.curvePoints, 1)

  let lo = 0
  let hi = arcTable.length - 1
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1
    if (arcTable[mid].len <= target) lo = mid
    else hi = mid
  }

  const a = arcTable[lo]
  const b = arcTable[hi]
  const span = b.len - a.len
  const local = span > 1e-8 ? (target - a.len) / span : 0
  const u = lerp(a.u, b.u, local)

  return sampleCurve(plan.curvePoints, u)
}

function curveTangentAtProgress(plan: VoyagerFlightPlan, progress: number) {
  const dt = 0.008
  const a = sampleAtArcProgress(plan, clamp01(progress - dt))
  const b = sampleAtArcProgress(plan, clamp01(progress + dt))
  return { vx: (b.x - a.x) / (2 * dt), vy: (b.y - a.y) / (2 * dt), uDelta: dt }
}

function shortestAngleDelta(from: number, to: number) {
  return ((to - from + 180) % 360) - 180
}

function createFlightPlan(pathname: string, maxScroll = readMaxScroll()): VoyagerFlightPlan {
  const complexity = curveComplexityFromMaxScroll(maxScroll)
  const start: VhPoint = { x: randRange(3, 97), y: randRange(4, 11) }
  const end: VhPoint = { x: randRange(3, 97), y: randRange(89, 96) }
  const curvePoints = buildScribbleKnots(start, end, complexity)
  const { arcTable, totalLength } = buildArcTable(curvePoints, complexity.arcSamples)

  return {
    pathname,
    start,
    end,
    curvePoints,
    arcTable,
    totalLength,
    maxScroll,
    knotCount: complexity.knotCount,
  }
}

function shouldRebuildPlan(plan: VoyagerFlightPlan, maxScroll: number) {
  if (maxScroll <= 0) return false
  const vh = window.innerHeight
  const prevPages = plan.maxScroll / Math.max(vh, 1)
  const nextPages = maxScroll / Math.max(vh, 1)
  return Math.abs(nextPages - prevPages) > 0.3
}

/** NavBar progress hairline — only drives how far along the doodle we are. */
function readNavScrollProgress() {
  const bar = document.querySelector('[data-nav-progress]')
  if (bar) {
    const scaleX = gsap.getProperty(bar, 'scaleX')
    if (typeof scaleX === 'number' && Number.isFinite(scaleX)) return clamp01(scaleX)
  }

  const max = ScrollTrigger.maxScroll(window)
  if (max <= 0) return 0
  const scroll = window.scrollY || document.documentElement.scrollTop || 0
  return clamp01(scroll / max)
}

function bodyPoseFromProgress(t: number, vx: number, vy: number): BodyPose {
  const cycle = t * 2.85
  const wave = Math.sin(cycle * Math.PI * 2)
  const wave2 = Math.cos(cycle * Math.PI * 2 + 0.65)

  const z = lerp(-150, 120, 0.5 + 0.5 * wave)
  const scale = lerp(0.46, 1.9, 0.5 + 0.5 * wave2)
  const far = z < -35
  const blur = far ? clamp((-z - 35) * 0.018, 0, 2.8) : 0
  const opacity = far ? lerp(0.48, 0.92, 1 - blur / 2.8) : 1

  const rotationY = clamp(vx * 0.55, -26, 26)
  const rotationX = clamp(-vy * 0.35 + wave * 8, -20, 20)

  return {
    scale,
    z,
    rotationX,
    rotationY,
    opacity,
    filter: blur > 0.05 ? `blur(${blur}px)` : 'blur(0px)',
  }
}

function setupProgressVoyagerFlight(plane: HTMLElement, body: HTMLElement, pathname: string) {
  let plan = createFlightPlan(pathname, readMaxScroll())
  let smoothHeading = 0
  let headingReady = false
  let smoothX: number | null = null
  let smoothY: number | null = null

  gsap.set(body, { transformOrigin: '50% 50%', transformPerspective: 900 })

  const resetMotionState = () => {
    headingReady = false
    smoothX = null
    smoothY = null
  }

  const rebuildPlanIfNeeded = () => {
    const max = readMaxScroll()
    if (!shouldRebuildPlan(plan, max)) return
    plan = createFlightPlan(pathname, max)
    resetMotionState()
  }

  const applyPose = () => {
    const vw = window.innerWidth / 100
    const vh = window.innerHeight / 100
    const progress = readNavScrollProgress()
    const p = sampleAtArcProgress(plan, progress)
    const { vx, vy } = curveTangentAtProgress(plan, progress)
    const depth = bodyPoseFromProgress(progress, vx, vy)

    const targetX = p.x * vw
    const targetY = p.y * vh
    if (smoothX === null || smoothY === null) {
      smoothX = targetX
      smoothY = targetY
    } else {
      smoothX += (targetX - smoothX) * 0.16
      smoothY += (targetY - smoothY) * 0.16
    }

    const targetHeading = Math.hypot(vx, vy) > 0.001 ? radToDeg(Math.atan2(vy * vh, vx * vw)) : smoothHeading

    if (!headingReady) {
      smoothHeading = targetHeading
      headingReady = true
    } else {
      smoothHeading += shortestAngleDelta(smoothHeading, targetHeading) * 0.12
    }

    gsap.set(plane, { x: smoothX, y: smoothY, rotation: smoothHeading })
    gsap.set(body, {
      scale: depth.scale,
      z: depth.z,
      rotationX: depth.rotationX,
      rotationY: depth.rotationY,
      opacity: depth.opacity,
      filter: depth.filter,
    })
  }

  applyPose()

  const onScrollMetricsReady = () => {
    ScrollTrigger.refresh()
    rebuildPlanIfNeeded()
    applyPose()
  }

  const driver = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: applyPose,
    invalidateOnRefresh: true,
  })

  const onRefresh = () => {
    rebuildPlanIfNeeded()
    resetMotionState()
    applyPose()
  }
  ScrollTrigger.addEventListener('refreshInit', onRefresh)
  gsap.ticker.add(applyPose)

  window.addEventListener('intro-scroll-ready', onScrollMetricsReady)
  const boot = gsap.delayedCall(0.35, onScrollMetricsReady)

  return () => {
    boot.kill()
    driver.kill()
    gsap.ticker.remove(applyPose)
    ScrollTrigger.removeEventListener('refreshInit', onRefresh)
    window.removeEventListener('intro-scroll-ready', onScrollMetricsReady)
  }
}

export { createFlightPlan, readNavScrollProgress, setupProgressVoyagerFlight }
