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
import PricingSection from '@/components/pricing'
import Agreement from '@/components/Agreement_v3'
import OneManTeamSection from '@/components/OneOnOneCoachingSection'
export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MainHeadingSection />
      <QuestionnaireSection />
      <FeaturesSection />
      <OneManTeamSection/>
      <TestimonialsSection />
      <PricingSection />
      <AppAccessSection />
      <Footer />
      <ScrollToTopButton />
    </main>
  )
}

