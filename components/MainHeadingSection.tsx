'use client'

import { useRouter } from 'next/navigation'

export default function MainHeadingSection() {
  const router = useRouter()
  return (
    <section id="main-heading" className="relative min-h-screen flex items-center justify-center bg-white">
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left side - Image with play button overlay */}
          <div className="relative">
            <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
              <img 
                src="/person-photo.jpg" 
                alt="Person" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400 text-xl">PERSON PHOTO PLACEHOLDER</span>
              </div>
              {/* Play button overlay */}
              <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-all group">
                <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Right side - Content */}
          {/* Right side - Content */}
<div className="text-center md:text-left space-y-8 max-w-3xl">
  <h1 className="font-extrabold leading-tight max-w-3xl">
  <span className="text-3xl md:text-4xl heading-font lg:text-5xl text-black block">
    {/* This isn’t about getting results and falling back, */}
    THIS ISN’T ABOUT GETTING RESULTS AND FALLING BACK,
  </span>

<span className="text-3xl md:text-4xl heading-font lg:text-5xl text-[#5A5A5A] block mt-2">
    {/* it’s about becoming the person who never does. */}
    IT’S ABOUT BECOMING THE PERSON WHO NEVER DOES.
  </span>
</h1>



<p className="text-lg md:text-xl normal-font md:leading-[25px] text-gray-600 leading-[90px] max-w-xl">
    This isn’t just about working out.<span className="block h-[15px]"></span>
    This is about stepping into the  <span className="block h-[15px]"></span> strongest, most confident version of <span className="block h-[15px]"></span>yourself. 
    My 1:1 coaching   program is<span className="block h-[15px]"></span> built to help you lift heavy, sharpen<span className="block h-[15px]"></span> your mindset, 
    and   build the kind of<span className="block h-[15px]"></span> discipline that turns evolution into a <span className="block h-[15px]"></span>lifestyle.  
    With customized training, <span className="block h-[15px]"></span>tailored nutrition, and real support, <span className="block h-[15px]"></span>  you’ll develop 
    the strength — both<span className="block h-[15px]"></span> physically and mentally — to  handle<span className="block h-[15px]"></span> anything life throws at you.
    Ready to<span className="block h-[15px]"></span> lock in and become  who you were truly<span className="block h-[15px]"></span> meant to be?
  </p>

  <div>
   

  </div>
</div>

        </div>
      </div>
    </section>
  )
}

