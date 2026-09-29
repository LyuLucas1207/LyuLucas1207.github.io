import type { PropsWithChildren } from 'react'
import type { LenisRef } from 'lenis/react'

import { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import { useLocation } from 'react-router-dom'

import { gsap, ScrollTrigger } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks'

import 'lenis/dist/lenis.css'

function SmoothScroll({ children, disabled = false }: PropsWithChildren<{ disabled?: boolean }>) {
  const lenisRef = useRef<LenisRef>(null)
  const location = useLocation()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || disabled) return

    const lenis = lenisRef.current?.lenis
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000)

    lenis?.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis?.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(update)
      gsap.ticker.lagSmoothing(500, 33)
    }
  }, [reduced, disabled])

  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true })
  }, [location.pathname])

  if (reduced || disabled) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, autoRaf: false }}
    >
      {children}
    </ReactLenis>
  )
}

export { SmoothScroll }
