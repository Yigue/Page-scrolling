'use client'

import { useState } from 'react'
import styles from './SponsorBanner.module.css'

export default function SponsorBanner() {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className={styles.sponsorBanner}>
      <button className={styles.closeBanner} onClick={handleClose}>
        ×
      </button>
      <div className={styles.bannerContent}>
        <p>
          👋 ¡Hola! Soy un desarrollador full-stack apasionado por crear experiencias web excepcionales. 🚀
          Este portafolio está construido con Next.js 14, TypeScript y animaciones suaves con Lenis.
        </p>
        <p>
          Actualmente disponible para proyectos freelance y oportunidades de colaboración. 💙
          ¿Tienes un proyecto en mente? ¡Hablemos! 🙌
        </p>
      </div>
      <a href="#contacto" className={styles.ctaLink}>
        <span>contáctame</span>
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M4 4L12 12M12 12V4M12 12H4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      </a>
    </div>
  )
}

