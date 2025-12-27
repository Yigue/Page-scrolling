'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/**
 * Component to integrate Lenis smooth scroll with GSAP ScrollTrigger
 * This ensures ScrollTrigger animations work correctly with Lenis
 * Based on official Lenis documentation: https://github.com/darkroomengineering/lenis
 */
export default function ScrollTriggerGSAP() {
  useEffect(() => {
    // Get the Lenis instance from the window (set by SmoothScroll)
    // We need to access it after SmoothScroll initializes it
    const lenisInstance = (window as any).lenis as Lenis | undefined

    if (!lenisInstance) {
      // If Lenis is not available yet, wait a bit and try again
      const timeout = setTimeout(() => {
        const lenis = (window as any).lenis as Lenis | undefined
        if (lenis) {
          setupGSAPIntegration(lenis)
        }
      }, 100)

      return () => clearTimeout(timeout)
    }

    setupGSAPIntegration(lenisInstance)

    function setupGSAPIntegration(lenis: Lenis) {
      // Update ScrollTrigger on Lenis scroll events
      lenis.on('scroll', ScrollTrigger.update)

      // Use GSAP ticker to update Lenis
      // This ensures smooth synchronization between Lenis and GSAP
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })

      // Disable lag smoothing for better scroll sync
      gsap.ticker.lagSmoothing(0)

      // Cleanup
      return () => {
        lenis.off('scroll', ScrollTrigger.update)
        gsap.ticker.remove((time) => {
          lenis.raf(time * 1000)
        })
      }
    }
  }, [])

  return null
}

