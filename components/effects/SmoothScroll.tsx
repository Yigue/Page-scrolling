'use client'

import { useEffect, useRef, ReactNode } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis with modern configuration
    // Configuration optimized for slower, smoother scroll like lenis.darkroom.engineering
    // Using manual RAF for better GSAP ScrollTrigger integration
    const lenis = new Lenis({
      duration: 2.8, // Slower duration for more smooth feel (like lenis.darkroom.engineering)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
      orientation: 'vertical', // Vertical scroll
      gestureOrientation: 'vertical',
      smoothWheel: true, // Enable smooth wheel scrolling
      wheelMultiplier: 0.5, // Reduced for slower, more controlled scroll
      touchMultiplier: 1.2, // Touch scroll multiplier
      infinite: false, // No infinite scroll
      autoRaf: false, // Manual RAF for GSAP integration
    })

    lenisRef.current = lenis

    // Expose Lenis instance to window for GSAP integration
    ;(window as any).lenis = lenis

    // Manual RAF loop for GSAP ScrollTrigger integration
    // This ensures proper synchronization with GSAP animations
    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // ScrollTrigger integration will be handled by ScrollTriggerGSAP component
    // to avoid timing issues

    // Cleanup function
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      delete (window as any).lenis
    }
  }, [])

  return <>{children}</>
}

