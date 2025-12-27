'use client'

import { useEffect } from 'react'
import {
  SmoothScroll,
  ScrollAnimations,
  ScrollEffects,
  SponsorBanner,
  BackgroundImages,
  Footer,
  HeroSection,
  WhySection,
  RethinkingSection,
  EnterSection,
  AboutSection,
  ProjectsSection
} from '@/components'

export default function Home() {
  useEffect(() => {
    console.log('🚀 Smooth Flow initialized successfully!')
    console.log('📦 Lenis smooth scroll active - Ultra suave')
    console.log('✨ All animations ready')
  }, [])

  return (
    <>
      <SmoothScroll>
        <ScrollAnimations />
        <SponsorBanner />
        <BackgroundImages />
        
        <main className="main-content">
          <HeroSection />
          <WhySection />
          <RethinkingSection />
          <EnterSection />
          <AboutSection />
          <ProjectsSection />
        </main>

        <Footer />
        <ScrollEffects />
      </SmoothScroll>
    </>
  )
}
