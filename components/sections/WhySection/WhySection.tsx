'use client'

import { useEffect, useRef } from 'react'
import styles from './WhySection.module.css'

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyContainerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
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
        // Antes de entrar a la sección
        progress = 0
      } else if (Math.abs(sectionTop) < sectionHeight - windowHeight) {
        // Dentro de la sección - PANTALLA FIJA
        progress = Math.abs(sectionTop) / (sectionHeight - windowHeight)
      } else {
        // Después de la sección
        progress = 1
      }

      // Aplicar easing suave
      const easedProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      // Animar cards individualmente basado en el progreso
      const totalCards = cardsRef.current.length
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Cada card aparece cuando el progreso alcanza su punto
          const cardProgress = Math.max(0, Math.min(1, (easedProgress * totalCards) - index))
          
          // Animación suave de aparición
          const opacity = cardProgress
          const y = (1 - cardProgress) * 100
          const scale = 0.9 + (cardProgress * 0.1)
          
          card.style.opacity = String(opacity)
          card.style.transform = `translateY(${y}px) scale(${scale})`
        }
      })

      // Animar título e imagen cuando entra la sección
      if (sectionTop <= 0 && sectionTop >= -windowHeight * 0.5) {
        const titleOpacity = Math.min(1, 1 - (Math.abs(sectionTop) / (windowHeight * 0.5)))
        const titleElement = stickyContainer.querySelector(`.${styles.sectionTitle}`) as HTMLElement
        const imageElement = stickyContainer.querySelector(`.${styles.stickyImage}`) as HTMLElement
        
        if (titleElement) titleElement.style.opacity = String(titleOpacity)
        if (imageElement) imageElement.style.opacity = String(titleOpacity)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className={`${styles.whySection} why-section`}>
      <div ref={stickyContainerRef} className={styles.stickyContainer}>
        <div className={styles.twoColumnLayout}>
          {/* Columna Izquierda - Fija (Sticky) */}
          <div className={styles.leftColumn}>
            <h2 className={`${styles.sectionTitle} ${styles.animatedText}`}>
              <span className={styles.word}>¿Por</span>
              <span className={styles.word}>qué</span>
              <span className={styles.word}>trabajar</span>
              <span className={styles.word}>conmigo?</span>
            </h2>
            
            <div className={styles.stickyImage}>
              <div className={styles.imagePlaceholder}>
                <svg width="100%" height="100%" viewBox="0 0 400 500" fill="none">
                  <rect width="400" height="500" fill="url(#gradient)" rx="20"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3"/>
                    </linearGradient>
                  </defs>
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" 
                        fill="rgba(255,255,255,0.5)" fontSize="24" fontFamily="system-ui">
                    Tu Foto Aquí
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Columna Derecha - Cards que aparecen al hacer scroll */}
          <div className={styles.rightColumn}>
            <div className={styles.cardsContainer}>
              <div 
                ref={el => { cardsRef.current[0] = el }}
                className={`${styles.featureCard} feature-card`}
              >
                <h3>Código limpio y mantenible</h3>
                <p>
                  Escribo código pensando en el futuro. Arquitecturas escalables, componentes reutilizables y 
                  documentación clara hacen que tus proyectos sean fáciles de mantener y evolucionar. Principios 
                  SOLID, patrones de diseño y mejores prácticas en cada línea.
                </p>
              </div>

              <div 
                ref={el => { cardsRef.current[1] = el }}
                className={`${styles.featureCard} feature-card`}
              >
                <h3>Experiencia full-stack completa</h3>
                <p>
                  Desde el diseño de interfaces hasta la arquitectura de backend y bases de datos. React, Next.js, 
                  Node.js, TypeScript, PostgreSQL, MongoDB. Puedo manejar todo el stack de tu proyecto con 
                  expertise en cada capa. ¡Soluciones completas!
                </p>
              </div>

              <div 
                ref={el => { cardsRef.current[2] = el }}
                className={`${styles.featureCard} feature-card`}
              >
                <h3>Performance y UX excepcionales</h3>
                <p>
                  Obsesionado con la velocidad y la experiencia del usuario. Optimización de Core Web Vitals, 
                  lazy loading, code splitting, SEO técnico. Tus usuarios disfrutarán de experiencias fluidas 
                  y rápidas que convierten visitantes en clientes.
                </p>
              </div>

              <div 
                ref={el => { cardsRef.current[3] = el }}
                className={`${styles.featureCard} feature-card`}
              >
                <h3>Comunicación clara y constante</h3>
                <p>
                  Mantengo una comunicación transparente durante todo el proyecto. Actualizaciones regulares, 
                  feedback continuo y documentación detallada. Sabrás exactamente qué está pasando en cada 
                  momento del desarrollo.
                </p>
              </div>

              <div 
                ref={el => { cardsRef.current[4] = el }}
                className={`${styles.featureCard} feature-card`}
              >
                <h3>Compromiso con los plazos</h3>
                <p>
                  Entiendo la importancia de cumplir con los tiempos. Planificación realista, estimaciones 
                  precisas y entrega puntual. Tu proyecto estará listo cuando lo necesites, sin sorpresas 
                  ni retrasos inesperados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
