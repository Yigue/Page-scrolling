'use client'

import { useEffect } from 'react'

export default function ScrollAnimations() {
  useEffect(() => {
    // Intersection Observer para animaciones al hacer scroll - SOLO UNA VEZ
    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -15% 0px',
      threshold: [0, 0.2]
    }

    const animateOnScroll = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement
          const delay = parseInt(element.getAttribute('data-delay') || '0')
          
          setTimeout(() => {
            element.style.opacity = '1'
            element.style.transform = 'translateY(0) scale(1)'
          }, delay)
          
          // Dejar de observar después de animar - LAS ANIMACIONES PERMANECEN
          observer.unobserve(element)
        }
      })
    }

    const observer = new IntersectionObserver(animateOnScroll, observerOptions)

    // Observar feature cards
    const featureCards = document.querySelectorAll('.feature-card, .problem-item, .benefit-item')
    featureCards.forEach((card, index) => {
      card.setAttribute('data-delay', (index * 150).toString())
      observer.observe(card)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}

