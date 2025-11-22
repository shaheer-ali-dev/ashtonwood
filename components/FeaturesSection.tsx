'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import FounderSection from './FounderSection'

export default function FeaturesSection() {
  const router = useRouter()

  const handleSignUp = () => {
    const element = document.getElementById('questionnaire')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }


  const features = [
    {
      title: 'Build Strength That Lasts:',
      items: [
        'Customized training plans built to help you lift heavier, grow real muscle, and feel genuinely strong.',
        'Full access to the Baddies Lift Heavy App so you can track your workouts, nutrition, and progress with ease.',
      ],
    },
    {
      title: 'Confidence From the Inside Out:',
      items: [
        'Mindset tools and practical strategies to help you break out of self-doubt and develop unbreakable discipline.',
        'Weekly check-ins to keep you grounded, focused, and consistent through your entire journey.',
      ],
    },
    {
      title: 'A Lifestyle You Can Maintain:',
      items: [
        'Nutrition guidance tailored to your exact goals, making eating clean simple and sustainable.',
        'Daily habit-building systems designed to stick with you for life — no more starting over.',
      ],
    },
    {
      title: 'Support You Can Count On:',
      items: ['Direct 1:1 communication with your coach, Tamara, for accountability, motivation, and real guidance whenever you need it.'],
    },
  ]

  return (
    <>
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center heading-font text-3xl md:text-4xl font-extrabold text-black-300 mb-10">
          What You'll Gain with 1:1 Coaching:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg border border-black-100 p-6 min-h-[240px] shadow-sm"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full border-2 border-black-200 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-black-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-black heading-font font-extrabold italic text-lg md:text-xl leading-tight">
                  {feature.title}
                </h3>
              </div>

              <ul className="mt-6 normal-font space-y-4 text-gray-800 text-sm">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex normal-font gap-3 items-start">
                    <span className="mt-1 text-[10px] normal-font leading-none">•</span>
                    <span className="text-[15px] normal-font">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
  onClick={handleSignUp}
  className="bg-white border border-black text-black px-10 py-4 rounded-full font-bold text-lg 
             hover:bg-black hover:text-white transition-all shadow-xl 
             transform hover:scale-105 flex items-center gap-2 group"
>
  SIGN UP NOW
  <svg
    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M13 7l5 5m0 0l-5 5m5-5H6" 
    />
  </svg>
</button>
        </div>
      </div>
    </section>
    <FounderSection />
    </>
  )
}