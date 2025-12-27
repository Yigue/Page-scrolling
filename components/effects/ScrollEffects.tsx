'use client'

import { useEffect } from 'react'

export default function ScrollEffects() {
  useEffect(() => {
    // Custom Cursor
    const cursor = document.createElement('div')
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.2s ease, opacity 0.3s ease;
      display: none;
    `
    document.body.appendChild(cursor)

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.display = 'block'
      cursor.style.left = e.clientX - 10 + 'px'
      cursor.style.top = e.clientY - 10 + 'px'
    }

    document.addEventListener('mousemove', handleMouseMove)

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-item, .feature-card')

    const handleMouseEnter = () => {
      cursor.style.transform = 'scale(1.5)'
      cursor.style.background = 'rgba(0, 0, 0, 0.5)'
    }

    const handleMouseLeave = () => {
      cursor.style.transform = 'scale(1)'
      cursor.style.background = 'rgba(0, 0, 0, 0.3)'
    }

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // Scroll Progress Bar
    const progressBar = document.createElement('div')
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      z-index: 9999;
      transform-origin: left;
      transform: scaleX(0);
      transition: transform 0.1s ease;
      width: 100%;
    `
    document.body.appendChild(progressBar)

    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = window.scrollY
      const progress = scrolled / windowHeight
      progressBar.style.transform = `scaleX(${progress})`
    }

    window.addEventListener('scroll', handleScroll)

    // Loading Animation
    document.body.style.opacity = '0'
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease'
      document.body.style.opacity = '1'
    }, 100)

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      cursor.remove()
      progressBar.remove()
    }
  }, [])

  return null
}

