'use client'

import React from 'react'

export default function FounderSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-2/3">
          <h3 className="heading-font text-2xl md:text-3xl font-extrabold text-black mb-4">
            Founder: <span className="text-gray-700">Ashton Woods</span>
          </h3>

          <p className="normal-font text-gray-700 text-base md:text-lg">
Growing up, I didn’t have much, but I always believed I was built for more.           </p>

          <p className="normal-font text-gray-700 text-base md:text-lg">
I never carried the idea that success wasn’t for me. If anything, the belief in my potential was always there. Even when people around me projected their own doubts onto me. Still, without real discipline, that potential felt like weight on my shoulders. I found myself stuck in the same cycles, holding back and knowing I wasn’t operating at the level I was really meant for. But eventually, I hit the point where I refused to live below my own standards.          </p>

          <p className="normal-font text-gray-700 text-base md:text-lg">I wanted full control over my life. Recognizing that my overall health was the first step, I took the leap and committed to fitness. Spiritual fitness. Mental fitness. Emotional Fitness, and physical fitness. Through my overall fitness journey, I learned that discipline is the true foundation of success. I realized that if I wanted change, I had to align with change, and pursue it relentlessly.</p>
          <p className="normal-font text-gray-700 text-base md:text-lg">By dropping excuses and ridding myself completely of self victimization, because if there’s ever a will… then there’s always a way. I went after my goals with real intention. No one else could, or would achieve them for me. This journey didn’t just reshape my body, it helped me rebuild my mind. Now, my mission reaches far beyond my own transformation. I want to help you rise into the strongest, most confident version of yourself. Through customized fitness and nutrition plans, positive habit building, and real support every step of the way. I’m going to help you unlock your potential and step into who you were always meant to be. <br /> Confidence is a lifestyle.</p>

        </div>

        <div className="md:w-1/3 flex justify-center md:justify-end">
          <div className="w-64 md:w-72 lg:w-96">
            <img src="/images/founder.jpg" alt="Tamara Arevalo" className="w-full h-auto object-cover rounded-md" />
          </div>
        </div>
      </div>
    </section>
  )
}