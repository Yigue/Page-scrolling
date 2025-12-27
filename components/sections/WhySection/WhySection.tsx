'use client'

import { useEffect, useRef } from 'react'
import styles from './WhySection.module.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título palabra por palabra
      gsap.fromTo(
        `.${styles.sectionTitle} .${styles.word}`,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.sectionTitle}`,
            start: 'top 60%',  // ← MUCHO MÁS TEMPRANO (60% = mitad superior)
            end: 'top 30%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Animación del texto intro
      gsap.fromTo(
        `.${styles.introText}`,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.introText}`,
            start: 'top 60%',  // ← MUCHO MÁS TEMPRANO
            toggleActions: 'play none none none',
          },
        }
      )

      // Animación de las cards con stagger
      gsap.fromTo(
        `.${styles.featureCard}`,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.featuresGrid}`,
            start: 'top 55%',  // ← Cards más temprano
            end: 'top 20%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={`${styles.whySection} why-section`}>
      <h2 className={`${styles.sectionTitle} ${styles.animatedText}`}>
        <span className={styles.word}>¿Por</span>
        <span className={styles.word}>qué</span>
        <span className={styles.word}>trabajar</span>
        <span className={styles.word}>conmigo?</span>
      </h2>

      <div className={styles.whyContent}>
        <p className={styles.introText}>
          He escuchado todas las preocupaciones al contratar un desarrollador. Falta de comunicación. Código difícil de mantener. 
          Plazos incumplidos. Proyectos sobre-complicados. Pero me gusta imaginar soluciones elegantes y luego construirlas. 
          Entonces, ¿por qué elegirme para tu próximo proyecto?
        </p>

        <div className={`${styles.featuresGrid} features-grid`}>
          <div className={`${styles.featureCard} feature-card`}>
            <h3>Código limpio y mantenible</h3>
            <p>
              Escribo código pensando en el futuro. Arquitecturas escalables, componentes reutilizables y 
              documentación clara hacen que tus proyectos sean fáciles de mantener y evolucionar. Principios 
              SOLID, patrones de diseño y mejores prácticas en cada línea.
            </p>
          </div>

          <div className={`${styles.featureCard} feature-card`}>
            <h3>Experiencia full-stack completa</h3>
            <p>
              Desde el diseño de interfaces hasta la arquitectura de backend y bases de datos. React, Next.js, 
              Node.js, TypeScript, PostgreSQL, MongoDB. Puedo manejar todo el stack de tu proyecto con 
              expertise en cada capa. ¡Soluciones completas!
            </p>
          </div>

          <div className={`${styles.featureCard} feature-card`}>
            <h3>Performance y UX excepcionales</h3>
            <p>
              Obsesionado con la velocidad y la experiencia del usuario. Optimización de Core Web Vitals, 
              lazy loading, code splitting, SEO técnico. Tus usuarios disfrutarán de experiencias fluidas 
              y rápidas que convierten visitantes en clientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
