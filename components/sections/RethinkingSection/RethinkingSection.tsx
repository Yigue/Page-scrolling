'use client'

import { useEffect, useRef } from 'react'
import styles from './RethinkingSection.module.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function RethinkingSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del subtítulo palabra por palabra
      gsap.fromTo(
        `.${styles.sectionSubtitle} .${styles.word}`,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.sectionSubtitle}`,
            start: 'top 80%',  // ← MUCHO MÁS TEMPRANO
            toggleActions: 'play none none none',
          },
        }
      )

      // Animación del texto
      gsap.fromTo(
        `.${styles.rethinkingText}`,
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
            trigger: `.${styles.rethinkingText}`,
            start: 'top 80%',  // ← MUCHO MÁS TEMPRANO
            toggleActions: 'play none none none',
          },
        }
      )

      // Animación de los items con stagger
      gsap.fromTo(
        `.${styles.problemItem}`,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.problemsGrid}`,
            start: 'top 80%',  // ← Items más temprano
            end: 'top 30%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={`${styles.rethinkingSection} rethinking-section`}>
      <div className={styles.rethinkingContent}>
        <p className={`${styles.sectionSubtitle} ${styles.animatedText}`}>
          <span className={styles.word}>Mi</span>
          <span className={styles.word}>experiencia</span>
          <span className={styles.word}>y</span>
          <span className={styles.word}>formación</span>
        </p>

        <p className={styles.rethinkingText}>
          Más de 5 años desarrollando aplicaciones web modernas. He trabajado con 
          <a href="#"> startups</a>, 
          <a href="#"> agencias digitales</a> y 
          <a href="#"> empresas consolidadas</a>. 
          Desde MVPs hasta plataformas enterprise, he construido soluciones que escalan y generan resultados.
        </p>
      </div>

      <div className={`${styles.problemsGrid} problems-grid`}>
        <div className={`${styles.problemItem} problem-item`}>
          <span className={styles.problemNumber}>01</span>
          <p>Front-End: React, Next.js, TypeScript, Tailwind CSS, Framer Motion</p>
        </div>
        <div className={`${styles.problemItem} problem-item`}>
          <span className={styles.problemNumber}>02</span>
          <p>Back-End: Node.js, Express, NestJS, Python, Django, RESTful APIs</p>
        </div>
        <div className={`${styles.problemItem} problem-item`}>
          <span className={styles.problemNumber}>03</span>
          <p>Bases de Datos: PostgreSQL, MongoDB, Redis, Prisma ORM</p>
        </div>
        <div className={`${styles.problemItem} problem-item`}>
          <span className={styles.problemNumber}>04</span>
          <p>DevOps: Docker, AWS, Vercel, GitHub Actions, CI/CD</p>
        </div>
        <div className={`${styles.problemItem} problem-item`}>
          <span className={styles.problemNumber}>05</span>
          <p>Testing: Jest, React Testing Library, Cypress, TDD/BDD</p>
        </div>
      </div>
    </section>
  )
}
