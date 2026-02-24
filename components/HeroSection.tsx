'use client'

import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter()

  const handleSignUp = () => {
    const element = document.getElementById('questionnaire')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const handleWaitlistClick = () => {
    router.push('/waitlist')
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

     

      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-50"
        style={{
         backgroundColor: '#5A5A5A'}}
      ></div>

      {/* Logo - Top Left, below banner */}
      <div className="absolute top-12 left-8 z-40"> {/* adjust top-12 to sit just below banner */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <img
              src="/logo-m.png"
              alt="AW Logo"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const placeholder = e.currentTarget.nextElementSibling as HTMLElement
                if (placeholder) placeholder.classList.remove('hidden')
              }}
            />
          </div>

          <div className="text-white">
            <div className="text-2xl font-bold whitespace-nowrap heading-font">
              SCULPT <br /> BY ASHTON
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative mt-3 z-10 w-full h-full flex items-center justify-center">
        <div className="w-full mt-3 max-w-6xl px-4 md:px-10 lg:px-16 flex flex-col items-center justify-center text-center">
          <header className="mb-6 mt-4 w-full flex justify-center">
            <div className="flex flex-col items-center">
              <div
                className="font-bold mt-4 text-white heading-font whitespace-nowrap"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', lineHeight: 1 }}
              >
                AVERAGE IS A HABIT
              </div>

              <div
                className="font-bold mt-3 text-white heading-font whitespace-nowrap"
                style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', lineHeight: 1 }}
              >
                GREATNESS IS A DECISION
              </div>
            </div>
          </header>

          <p className="text-white text-base sm:text-lg md:text-xl mb-8 leading-relaxed normal-font w-full max-w-7xl">
            Sculpted by Ashton isn't just about building a powerful physique...
          </p>

          <button
            onClick={handleSignUp}
            className="bg-black border border-black text-white px-10 py-4 rounded-full font-bold text-lg 
                       shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out
                       transform hover:scale-105 flex items-center gap-2 group"
          >
            SIGN UP NOW
            <img src="https://cdn.prod.website-files.com/681907465c74d32f50b71064/681907465c74d32f50b71077_arrow-circle-broken-right.svg" alt="" />
          </button>
        </div>
      </div>
    </section>
  )
}
