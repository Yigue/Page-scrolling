'use client'

import { useEffect, useRef } from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const footerElements = footer.querySelectorAll(`.${styles.footerTitle}, .${styles.footerSubtitle}, .${styles.footerCta}, .${styles.footerBottom}`)
    footerElements.forEach(el => {
      const element = el as HTMLElement
      element.style.opacity = '0'
      element.style.transform = 'translateY(40px)'
      element.style.transition = 'all 0.8s ease'
    })

    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll(`.${styles.footerTitle}, .${styles.footerSubtitle}, .${styles.footerCta}, .${styles.footerBottom}`)
          elements.forEach((el, index) => {
            setTimeout(() => {
              const element = el as HTMLElement
              element.style.opacity = '1'
              element.style.transform = 'translateY(0)'
            }, index * 150)
          })
        }
      })
    }, {
      threshold: 0.2
    })
    
    footerObserver.observe(footer)

    return () => {
      footerObserver.disconnect()
    }
  }, [])

  return (
    <footer ref={footerRef} className={`${styles.footer} footer`}>
      <div className={styles.footerContent}>
        <div className={styles.footerMain}>
          <p className={styles.footerTitle}>
            <span>Disponible para</span>
            <span>Proyectos Freelance</span>
          </p>
          <p className={styles.footerSubtitle}>
            <span>¿Tienes un proyecto en mente?</span>
            <span>Hagámoslo realidad</span>
          </p>
          <a href="mailto:tu@email.com" className={styles.footerCta}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
            </svg>
            <span>
              <span>Envíame un mensaje</span>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M4 4L12 12M12 12V4M12 12H4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </span>
          </a>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerLinks}>
            <a href="https://twitter.com/tuusuario" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:tu@email.com">Email</a>
          </div>
          <p className={styles.footerCopy}>© 2025 Tu Nombre · Full-Stack Developer</p>
        </div>
      </div>
    </footer>
  )
}

