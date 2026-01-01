'use client'

import { useEffect, useRef } from 'react'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const stickyContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = heroRef.current
    const stickyContainer = stickyContainerRef.current
    if (!section || !stickyContainer) return

    const handleScroll = () => {
      const sectionRect = section.getBoundingClientRect()
      const sectionTop = sectionRect.top
      const sectionHeight = sectionRect.height
      const windowHeight = window.innerHeight

      // Calcular progreso dentro de la sección (0 a 1)
      let progress = 0
      
      if (sectionTop > 0) {
        progress = 0
      } else if (Math.abs(sectionTop) < sectionHeight - windowHeight) {
        progress = Math.abs(sectionTop) / (sectionHeight - windowHeight)
      } else {
        progress = 1
      }

      // Easing suave
      const easedProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      // Animar elementos basado en el progreso
      const badge = stickyContainer.querySelector(`.${styles.heroBadge}`) as HTMLElement
      const scrollIndicator = stickyContainer.querySelector(`.${styles.scrollIndicator}`) as HTMLElement
      const titleLines = stickyContainer.querySelectorAll(`.${styles.titleLine}`)
      const ctas = stickyContainer.querySelectorAll(`.${styles.heroCtas} a`)

      // Badge aparece primero
      if (badge && easedProgress > 0.1) {
        const badgeProgress = Math.min(1, (easedProgress - 0.1) / 0.2)
        badge.style.opacity = String(badgeProgress)
        badge.style.transform = `translateY(${(1 - badgeProgress) * -30}px)`
      }

      // Scroll indicator
      if (scrollIndicator && easedProgress > 0.2) {
        const indicatorProgress = Math.min(1, (easedProgress - 0.2) / 0.2)
        scrollIndicator.style.opacity = String(indicatorProgress)
        scrollIndicator.style.transform = `translateY(${(1 - indicatorProgress) * -20}px)`
      }

      // Título líneas
      titleLines.forEach((line, index) => {
        if (easedProgress > 0.3 + index * 0.15) {
          const lineProgress = Math.min(1, (easedProgress - (0.3 + index * 0.15)) / 0.2)
          const element = line as HTMLElement
          element.style.opacity = String(lineProgress)
          element.style.transform = `translateY(${(1 - lineProgress) * 80}px)`
        }
      })

      // CTAs
      ctas.forEach((cta, index) => {
        if (easedProgress > 0.7 + index * 0.1) {
          const ctaProgress = Math.min(1, (easedProgress - (0.7 + index * 0.1)) / 0.15)
          const element = cta as HTMLElement
          element.style.opacity = String(ctaProgress)
          element.style.transform = `translateY(${(1 - ctaProgress) * 30}px)`
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={heroRef} className={styles.heroSection}>
      <div ref={stickyContainerRef} className={styles.stickyContainer}>
        <div className={styles.heroBadge}>
          <div className={styles.badgeInner}>
            <h2>Full-Stack Developer</h2>
            <h2>© 2025 Portfolio</h2>
          </div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.scrollIndicator}>
            <p>scroll</p>
            <p>para explorar</p>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>Desarrollador Full-Stack</span>
            <span className={styles.titleLine}>creando experiencias web excepcionales</span>
            <span className={`${styles.titleLine} ${styles.small}`}>JavaScript · TypeScript · React · Next.js · Node.js</span>
          </h1>

          <div className={styles.heroCtas}>
            <a href="#proyectos" className={styles.ctaButton}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
              </svg>
              <span>ver proyectos</span>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </a>
            <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
              </svg>
              <span>GitHub</span>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M7 17L17 7M17 7V17M17 7H7" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
