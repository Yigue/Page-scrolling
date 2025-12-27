'use client'

import { useEffect } from 'react'
import styles from './BackgroundImages.module.css'

export default function BackgroundImages() {
  useEffect(() => {
    const bgImages = document.querySelectorAll(`.${styles.bgImage}`)
    
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      
      bgImages.forEach((bg, index) => {
        const speed = 0.5 + (index * 0.2)
        const element = bg as HTMLElement
        element.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed * 0.05}px) scale(${1 + scrolled * 0.0001})`
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={styles.bgImages}>
      <div className={`${styles.bgImage} ${styles.bg1}`}></div>
      <div className={`${styles.bgImage} ${styles.bg2}`}></div>
    </div>
  )
}

