'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Component to integrate Lenis smooth scroll with GSAP ScrollTrigger
 * This ensures ScrollTrigger animations work correctly with Lenis
 * Based on official Lenis documentation: https://github.com/darkroomengineering/lenis
 * 
 * Note: Lenis instance is already integrated in SmoothScroll component
 * This component just ensures ScrollTrigger is properly updated
 */
export default function ScrollTriggerGSAP() {
  useEffect(() => {
    // Get the Lenis instance from the window (set by SmoothScroll)
    const lenis = (window as any).lenis

    if (!lenis) {
      // Wait for Lenis to be initialized
      const checkLenis = setInterval(() => {
        const lenisInstance = (window as any).lenis
        if (lenisInstance) {
          clearInterval(checkLenis)
          setupGSAPIntegration(lenisInstance)
        }
      }, 50)

      return () => clearInterval(checkLenis)
    }

    const cleanup = setupGSAPIntegration(lenis)

    function setupGSAPIntegration(lenis: any) {
      // Update ScrollTrigger on Lenis scroll events
      // This is the key integration point
      lenis.on('scroll', ScrollTrigger.update)

      // Disable lag smoothing for better scroll sync
      gsap.ticker.lagSmoothing(0)

      // Return cleanup function
      return () => {
        if (lenis && lenis.off) {
          lenis.off('scroll', ScrollTrigger.update)
        }
      }
    }

    // Cleanup on unmount
    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  return null
}

