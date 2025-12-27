'use client'

import { useEffect, useRef } from 'react'
import styles from './HeroSection.module.css'
import { gsap } from 'gsap'

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del badge
      gsap.fromTo(
        `.${styles.heroBadge}`,
        {
          opacity: 0,
          y: -30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
        }
      )

      // Animación del scroll indicator
      gsap.fromTo(
        `.${styles.scrollIndicator}`,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.5,
        }
      )

      // Animación de las líneas del título
      gsap.fromTo(
        `.${styles.titleLine}`,
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.6,
        }
      )

      // Animación de los CTAs
      gsap.fromTo(
        `.${styles.heroCtas} a`,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 1.5,
        }
      )

      // Animación flotante del badge (loop infinito)
      gsap.to(`.${styles.heroBadge}`, {
        y: -10,
        duration: 2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className={styles.heroSection}>
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
    </section>
  )
}
