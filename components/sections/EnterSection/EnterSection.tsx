'use client'

import { useEffect, useRef } from 'react'
import styles from './EnterSection.module.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function EnterSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de los títulos grandes con efecto de escala
      const bigTitles = gsap.utils.toArray(`.${styles.bigTitle}`)
      
      bigTitles.forEach((title, index) => {
        gsap.fromTo(
          title as HTMLElement,
          {
            opacity: 0,
            scale: 0.8,
            y: 100,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: title as HTMLElement,
              start: 'top 60%',  // ← MUCHO MÁS TEMPRANO
              end: 'top 30%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.2,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={`${styles.enterSection} enter-section`}>
      <h2 className={styles.bigTitle}>
        <span>así que decidí</span>
        <span>crear soluciones</span>
      </h2>
      <h2 className={`${styles.bigTitle} ${styles.highlight}`}>
        <span>Soy</span>
        <span>Tu Nombre</span>
      </h2>
      <h2 className={styles.bigTitle}>Y esto es lo que hago</h2>
    </section>
  )
}
