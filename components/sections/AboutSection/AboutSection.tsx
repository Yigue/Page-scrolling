'use client'

import { useEffect, useRef } from 'react'
import styles from './AboutSection.module.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del intro
      gsap.fromTo(
        `.${styles.aboutIntro}`,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.aboutIntro}`,
            start: 'top 60%',  // ← MUCHO MÁS TEMPRANO
            toggleActions: 'play none none none',
          },
        }
      )

      // Animación del título palabra por palabra
      gsap.fromTo(
        `.${styles.benefitsTitle} .${styles.word}`,
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
            trigger: `.${styles.benefitsTitle}`,
            start: 'top 60%',  // ← MUCHO MÁS TEMPRANO
            toggleActions: 'play none none none',
          },
        }
      )

      // Animación de los benefit items
      gsap.fromTo(
        `.${styles.benefitItem}`,
        {
          opacity: 0,
          y: 70,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.benefitsGrid}`,
            start: 'top 55%',  // ← Items más temprano
            end: 'top 5%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={`${styles.aboutSection} about-section`}>
      <p className={styles.aboutIntro}>
        Soy un desarrollador 
        <a href="#"> apasionado por la innovación</a>, 
        especializado en crear aplicaciones web modernas que combinan diseño elegante con código robusto. 
        Mi objetivo es transformar ideas en productos digitales que generen impacto real.
      </p>

      <div className={`${styles.benefitsSection} benefits-section`}>
        <div className={`${styles.benefitsTitle} benefits-title`}>
          <p className={styles.animatedText}>
            <span className={styles.word}>Lo</span>
            <span className={styles.word}>que</span>
            <span className={styles.word}>puedo</span>
            <span className={styles.word}>hacer</span>
            <span className={styles.word}>por ti</span>
          </p>
        </div>

        <div className={`${styles.benefitsGrid} benefits-grid`}>
          <div className={`${styles.benefitItem} benefit-item`}>
            <span className={styles.benefitNumber}>01</span>
            <p>Desarrollo de aplicaciones web full-stack desde cero</p>
          </div>
          <div className={`${styles.benefitItem} benefit-item`}>
            <span className={styles.benefitNumber}>02</span>
            <p>Migración a <span className={styles.highlight}>tecnologías modernas</span></p>
          </div>
          <div className={`${styles.benefitItem} benefit-item`}>
            <span className={styles.benefitNumber}>03</span>
            <p>Optimización de performance y SEO</p>
          </div>
          <div className={`${styles.benefitItem} benefit-item`}>
            <span className={styles.benefitNumber}>04</span>
            <p>Diseño e implementación de APIs RESTful</p>
          </div>
          <div className={`${styles.benefitItem} benefit-item`}>
            <span className={styles.benefitNumber}>05</span>
            <p>INTEGRACIÓN CON SERVICIOS DE TERCEROS (STRIPE, AWS, ETC.)</p>
          </div>
          <div className={`${styles.benefitItem} benefit-item`}>
            <span className={styles.benefitNumber}>06</span>
            <p>Sistemas de autenticación y autorización seguros</p>
          </div>
          <div className={`${styles.benefitItem} benefit-item`}>
            <span className={styles.benefitNumber}>07</span>
            <p>Dashboards y paneles de administración personalizados</p>
          </div>
          <div className={`${styles.benefitItem} benefit-item`}>
            <span className={styles.benefitNumber}>08</span>
            <p>"Animaciones y microinteracciones que enamoran"</p>
          </div>
          <div className={`${styles.benefitItem} benefit-item`}>
            <span className={styles.benefitNumber}>09</span>
            <p>Responsive design y apps mobile-first</p>
          </div>
        </div>
      </div>
    </section>
  )
}
