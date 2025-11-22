'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

export default function Footer() {
  const router = useRouter()

  const handleSignUp = () => {
    const element = document.getElementById('questionnaire')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-black text-white py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          
          {/* LEFT SIDE */}
          <div className="md:col-span-2">
            <div className="absolute top-8 left-8 z-20">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
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
            </div>
          </div>

          <div className="text-white">
            <div className="text-2xl font-bold whitespace-nowrap heading-font">
              Sculpt <br /> By Ashton
            </div>
          </div>
        </div>
      </div>
<br /><br />
            <h3 className="mt-8 heading-font text-2xl md:text-3xl lg:text-4xl font-extrabold text-white max-w-lg">
              Step into Your Evolution
            </h3>

            <div className="mt-8">
              <button
                onClick={handleSignUp}
                className="inline-flex items-center gap-4 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition"
              >
                <span>SIGN UP NOW</span>
                <span className="bg-white/10 rounded-full p-2 inline-flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 01.083 1.32l-.083.094-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="text-right">
            <p className="text-sm text-white/80">
              Copyright © {new Date().getFullYear()} <span className="font-semibold">Sculpt By Ashton</span> All rights reserved.
            </p>

            <div className="mt-4 text-xs space-x-4">
              <a href="/privacy" className="underline text-white/85 hover:text-white">Privacy Policy</a>
              <a href="/terms" className="underline text-white/85 hover:text-white">Terms of Service</a>
              <a href="/contact" className="underline text-white/85 hover:text-white">Contact</a>
            </div>

            {/* SOCIAL ICONS FIXED HERE */}
            <div className="mt-6 flex justify-end space-x-4">

              {/* Instagram */}
              <a href="https://www.instagram.com/ashtonslifts?igsh=eTJqa3Y5dXk5cWY1&utm_source=qr" 
                 aria-label="Instagram"
                 target="_blank"
                 className="opacity-95 hover:opacity-100">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5" strokeWidth="1.5"></rect>
                  <circle cx="12" cy="12" r="3.2" strokeWidth="1.5"></circle>
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"></circle>
                </svg>
              </a>

              {/* TikTok */}
              <a href="https://www.tiktok.com/@ashtonslifts?_r=1&_t=ZS-91VJMLNhlSM"
                 aria-label="TikTok"
                 target="_blank"
                 className="opacity-95 hover:opacity-100">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 3v8.25A4.75 4.75 0 1 1 11 6.5V9.6A7.5 7.5 0 1 0 19.5 17V3h-3z"></path>
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}
