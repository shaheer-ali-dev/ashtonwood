'use client'

import { useEffect, useState } from 'react'
import HeroSection from '@/components/HeroSection'
import MainHeadingSection from '@/components/MainHeadingSection'
import QuestionnaireSection from '@/components/QuestionnaireSection'
import FeaturesSection from '@/components/FeaturesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import AppAccessSection from '@/components/AppAccessSection'
import Footer from '@/components/Footer'
import ScrollToTopButton from '@/components/ScrollToTopButton'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MainHeadingSection />
      <QuestionnaireSection />
      <FeaturesSection />
      <TestimonialsSection />
      <AppAccessSection />
      <Footer />
      <ScrollToTopButton />
    </main>
  )
}

