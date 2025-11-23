'use client'

export default function HeroSection() {
  const handleSignUp = () => {
    const element = document.getElementById('questionnaire')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div
  className="absolute inset-0 z-0 bg-cover bg-center opacity-50"
  style={{
    backgroundImage:
      "url('https://cdn.prod.website-files.com/6773cb824c57db1c0a15b59d%2F6773cd7d02096e83a1e56f2c_looped%20hero%20vid-poster-00001.jpg')",
  }}
></div>


      {/* Optional Overlay for text readability */}
      <div className="absolute inset-0"></div>

      {/* Logo - Top Left */}
      <div className="absolute top-8 left-8 z-20">
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
              {/* Sculpt <br /> By Ashton */}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="w-full max-w-6xl px-4 md:px-10 lg:px-16 flex flex-col items-center justify-center text-center">
          <header className="mb-6 w-full flex justify-center">
            <div className="flex flex-col items-center">
              <div
                className="font-bold text-white heading-font whitespace-nowrap"
                style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)', lineHeight: 1 }}
              >
                {/* Average is a habit. */}
                AVERAGE IS A HABIT
              </div>

              <div
                className="font-bold mt-3 text-white heading-font whitespace-nowrap"
                style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', lineHeight: 1 }}
              >
               {/* Greatness is a decision. */}
                GREATNESS IS A DECISION
              </div>
            </div>
          </header>

          <p className="text-white text-base sm:text-lg md:text-xl mb-8 leading-relaxed normal-font w-full max-w-7xl">
            Sculpted by Ashton isn't just about building a powerful physique. It's a mindset. It's understanding that <span className="block h-[15px]"></span>your body is a   work of art in every single way. And this piece of art is built on the foundation of discipline, <span className="block h-[15px]"></span>self-respect, the relentless,   and endless drive to evolve. This is about becoming the version of yourself that <span className="block h-[15px]"></span>follows through, that leads, that shows   up with intention every single day. I'm here to guide that<span className="block h-[15px]"></span> transformation with fitness and nutrition tailored specifically   to YOU, helping you step into your strongest, <span className="block h-[15px]"></span>most unstoppable self.
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
