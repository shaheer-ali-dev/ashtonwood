'use client'

import React from "react"

export default function AppAccessSection() {
   const handleSignUp = () => {
    const element = document.getElementById('questionnaire')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-10 bg-[#E5E7EB]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Layered device images */}
         <div className="relative order-2 md:order-1 flex items-center justify-center">
  <div className="relative w-[600px] h-[500px] md:w-[750px] md:h-[600px] flex items-center justify-center">
    
    <img
      src="/app-screenshot.png"
      alt="App Watch mock"
      className="w-[200px] md:w-[260px] object-contain z-30"
    />

  </div>
</div>


          {/* Right side - Content */}
          <div className="text-center md:text-left order-1 md:order-2 space-y-6 px-4">
            <div className="flex items-center justify-center md:justify-start">
              <div className="w-24 h-24 rounded-lg flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="AW Logo"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                />
                <div className="hidden absolute inset-0 bg-transparent text-white flex items-center justify-center font-bold text-lg rounded">
                  AW
                </div>
              </div>
              <span className="text-xs tracking-widest normal-font text-gray-500 uppercase heading-font">
                Sculpt App By Ashton
              </span>
            </div>

            {/* Standardized Heading */}
            <h2 className="heading-font font-extrabold text-gray-900 leading-tight text-3xl md:text-3xl lg:text-3xl">
              CLAIM THE CONFIDENCE THAT ALREADY BELONGS TO YOU
            </h2>

            {/* Standardized Paragraph */}
            <p className="normal-font text-gray-600 text-lg md:text-xl max-w-xl mx-auto md:mx-0">
              Track your progress, access workouts, and stay connected with your coach.
            </p>

            <div className="flex justify-center md:justify-start">
              <button
  onClick={handleSignUp}
  className="bg-black border border-black text-white px-10 py-4 rounded-full font-bold text-lg 
             shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out
             transform hover:scale-105 flex items-center gap-2 group"
>
  GET ACCESS TO MY APP
  <img src="https://cdn.prod.website-files.com/681907465c74d32f50b71064/681907465c74d32f50b71077_arrow-circle-broken-right.svg" alt="" />
</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

