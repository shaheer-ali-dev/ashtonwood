'use client'

import React from "react"

export default function AppAccessSection() {
   const handleSignUp = () => {
    const element = document.getElementById('questionnaire')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Layered device images (stacked copies to simulate multiple devices/watch) */}
          <div className="relative order-2 md:order-1 flex items-center justify-center">
            <div className="relative w-[520px] h-[420px] md:w-[680px] md:h-[520px]">
              {/* Left-most phone */}
              <img
                src="/app-screenshot.jpg"
                alt="App Screenshot - left"
                className="absolute left-0 top-8 w-[320px] md:w-[380px] object-cover rounded-3xl shadow-2xl transform -rotate-12 -translate-x-10 z-10"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  const ph = e.currentTarget.nextElementSibling
                  if (ph) ph.classList.remove("hidden")
                }}
              />
             

              {/* Center phone (main) */}
              <img
                src="/app-screenshot.jpg"
                alt="App Screenshot - center"
                className="absolute left-1/2 top-0 w-[360px] md:w-[420px] object-cover rounded-3xl shadow-2xl transform -translate-x-1/2 z-20"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  const ph = e.currentTarget.nextElementSibling
                  if (ph) ph.classList.remove("hidden")
                }}
              />
             

              {/* Right-most phone */}
              <img
                src="/app-screenshot.jpg"
                alt="App Screenshot - right"
                className="absolute right-0 top-12 w-[300px] md:w-[360px] object-cover rounded-3xl shadow-2xl transform rotate-6 translate-x-8 z-0"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  const ph = e.currentTarget.nextElementSibling
                  if (ph) ph.classList.remove("hidden")
                }}
              />
             
              {/* Foreground watch (simulated by resizing the same asset) */}
              <img
                src="/app-screenshot.jpg"
                alt="App Watch mock"
                className="absolute left-1/2 bottom-0 w-[100px] md:w-[140px] object-cover rounded-2xl shadow-2xl transform -translate-x-8 translate-y-8 z-30"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  const ph = e.currentTarget.nextElementSibling
                  if (ph) ph.classList.remove("hidden")
                }}
              />
              <div className="hidden absolute left-1/2 bottom-0 w-[100px] md:w-[140px] rounded-2xl bg-gray-200 flex items-center justify-center text-gray-400 transform -translate-x-8 translate-y-8 z-30">
                <span>APP</span>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="text-center md:text-left order-1 md:order-2 space-y-6 px-4">
            {/* small pill logo */}
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-14 h-14 rounded-lg bg-white border border-pink-200 shadow-sm flex items-center justify-center">
                {/* simple letter/logo fallback */}
 <img
              src="/logo.png"
              alt="AW Logo"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const placeholder = e.currentTarget.nextElementSibling as HTMLElement
                if (placeholder) placeholder.classList.remove('hidden')
              }}
            />
            <div className="hidden absolute inset-0 bg-transparent text-white flex items-center justify-center font-bold text-lg rounded">
              AW
            </div>              </div>
              <span className="text-xs tracking-widest normal-font text-gray-500 uppercase">Sculpt App By Ashton</span>
            </div>

            <h2 className="text-3xl md:text-4xl heading-font lg:text-5xl font-extrabold text-gray-900 leading-tight">
Claim the confidence that already belongs to you              <br />
            </h2>

            <p className="text-gray-600 normal-font max-w-xl mx-auto md:mx-0">
              Track your progress, access workouts, and stay connected with your coach.
            </p>

            <div className="flex justify-center md:justify-start">
              <button onClick={handleSignUp} className="bg-white border border-black text-black px-10 py-4 rounded-full font-bold text-lg 
             hover:bg-black hover:text-white transition-all shadow-xl 
             transform hover:scale-105 flex items-center gap-2 group">
                <span>GET ACCESS TO MY APP</span>
                <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  {/* right arrow */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 01.083 1.32l-.083.094-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}