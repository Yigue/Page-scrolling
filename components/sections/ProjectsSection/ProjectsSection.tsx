'use client'

import { useEffect, useRef } from 'react'
import styles from './ProjectsSection.module.css'

const projects = [
  { name: 'E-Commerce Platform', company: 'Next.js + Stripe + PostgreSQL', number: '01' },
  { name: 'SaaS Dashboard', company: 'React + Node.js + MongoDB', number: '02' },
  { name: 'Portfolio Animado', company: 'Framer Motion + TypeScript', number: '03' },
  { name: 'API REST Escalable', company: 'NestJS + PostgreSQL + Redis', number: '04' },
  { name: 'App de Gestión', company: 'TypeScript + Prisma + React', number: '05' },
  { name: 'Landing Premium', company: 'Next.js 14 + Lenis + GSAP', number: '06' },
  { name: 'Real-Time Chat', company: 'WebSockets + Redis + Express', number: '07' },
  { name: 'Analytics Dashboard', company: 'D3.js + PostgreSQL + React', number: '08' },
]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const list = listRef.current
    const title = titleRef.current
    if (!section || !list || !title) return

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
        // Dentro de la sección - AQUÍ SE DETIENE LA PÁGINA
        progress = Math.abs(sectionTop) / (sectionHeight - windowHeight)
      } else {
        // Después de la sección
        progress = 1
      }

      // Aplicar easing cúbico suave para movimiento natural
      const easedProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      // Calcular el desplazamiento horizontal
      const maxScroll = list.scrollWidth - window.innerWidth + 160
      const scrollAmount = easedProgress * maxScroll

      // Aplicar el movimiento horizontal
      list.style.transform = `translateX(-${scrollAmount}px)`

      // Animar título - fade in cuando entra
      if (sectionTop <= 0 && sectionTop >= -windowHeight) {
        const titleOpacity = Math.min(1, 1 - (Math.abs(sectionTop) / windowHeight) * 0.5)
        title.style.opacity = String(titleOpacity)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className={`${styles.projectsSection} projects-section`}>
      <div className={styles.stickyContainer}>
        <div ref={titleRef} className={styles.projectsTitle}>
          <p className={styles.animatedText}>
            <span className={styles.word}>Proyectos</span>{' '}
            <span className={styles.word}>destacados</span>{' '}
            <span className={styles.word}>que</span>{' '}
            <span className={styles.word}>he</span>{' '}
            <span className={styles.word}>construido</span>
          </p>
        </div>

        <div className={styles.horizontalScrollWrapper}>
          <ul ref={listRef} className={styles.projectsList}>
            {projects.map((project, index) => (
              <li key={index} className={styles.projectItem}>
                <a href="#" className={styles.projectCard}>
                  <div className={styles.projectContent}>
                    <div className={styles.projectHeader}>
                      <h3>{project.name}</h3>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7 7L17 17M17 17V7M17 17H7" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <p>{project.company}</p>
                  </div>
                  <div className={styles.projectNumber}>{project.number}</div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
