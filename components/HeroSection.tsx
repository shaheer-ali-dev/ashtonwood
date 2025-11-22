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
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cdn.prod.website-files.com/6773cb824c57db1c0a15b59d%2F6773cd7d02096e83a1e56f2c_looped%20hero%20vid-poster-00001.jpg')",
        }}
      ></div>

      {/* Optional Overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Logo - Top Left */}
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

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="w-full max-w-6xl px-4 md:px-10 lg:px-16 flex flex-col items-center justify-center text-center">
          <header className="mb-6 w-full flex justify-center">
            <div className="flex flex-col items-center">
              <div
                className="font-bold text-white heading-font whitespace-nowrap"
                style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)', lineHeight: 1 }}
              >
                Average is a habit.
              </div>

              <div
                className="font-bold mt-3 text-white heading-font whitespace-nowrap"
                style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', lineHeight: 1 }}
              >
               Greatness is a decision.
              </div>
            </div>
          </header>

          <p className="text-white text-base sm:text-lg md:text-xl mb-8 leading-relaxed normal-font w-full max-w-7xl">
            Sculpted by Ashton isn't just about building a powerful physique. It's a mindset. It's understanding that your body is a work of art in every single way. And this piece of art is built on the foundation of discipline, self-respect, the relentless, and endless drive to evolve. This is about becoming the version of yourself that follows through, that leads, that shows up with intention every single day. I'm here to guide that transformation with fitness and nutrition tailored specifically to YOU, helping you step into your strongest, most unstoppable self.
          </p>

       <button
  onClick={handleSignUp}
  className="bg-white border border-black text-black px-10 py-4 rounded-full font-bold text-lg 
             hover:bg-black hover:text-white transition-all shadow-xl 
             transform hover:scale-105 flex items-center gap-2 group"
>
  SIGN UP NOW
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2.2"
    stroke="black"
    className="w-6 h-6 transition-all group-hover:stroke-white"
  >
    <circle cx="12" cy="12" r="9"></circle>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 8l4 4-4 4" />
  </svg>
</button>


        </div>
      </div>
    </section>
  )
}
