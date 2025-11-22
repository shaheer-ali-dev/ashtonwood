'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "5 inches already!! I'm crying! This wouldn't be possible if it wasn't for your constant support! This is only the beginning",
      author: 'Ashley',
    },
    {
      quote:
        "Wait those progress photos are actually insane — it's so easy to forget all the work I've put in, but it's really about the small wins that add up to the bigger outcome!",
      author: 'Laurie',
    },
    {
      quote: "I'm so glad I committed — the accountability and structure changed everything for me.",
      author: 'Maya',
    },
    {
      quote: 'The coaching gave me the confidence to push harder and finally see results.',
      author: 'Sam',
    },
  ]

  const transformations = [
    '/images/trans1.jpg',
    '/images/trans2.jpg',
    '/images/trans3.jpg',
    '/images/trans4.jpg',
  ]

  // Slides: testimonials -> 2 cards per slide; transformations -> 3 images per slide
  const testimonialSlides = useMemo(() => {
    const slides: Array<typeof testimonials[number][]> = []
    for (let i = 0; i < testimonials.length; i += 2) slides.push(testimonials.slice(i, i + 2))
    return slides
  }, [testimonials])

  const transformSlides = useMemo(() => {
    const slides: string[][] = []
    for (let i = 0; i < transformations.length; i += 3) slides.push(transformations.slice(i, i + 3))
    return slides
  }, [transformations])

  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeTransform, setActiveTransform] = useState(0)
  const [paused, setPaused] = useState(false)
  const autoTimerRef = useRef<number | null>(null)

  // autoplay testimonials
  useEffect(() => {
    if (paused || testimonialSlides.length <= 1) return
    autoTimerRef.current = window.setInterval(() => {
      setActiveTestimonial((s) => (s + 1) % testimonialSlides.length)
    }, 6000)
    return () => {
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current)
        autoTimerRef.current = null
      }
    }
  }, [paused, testimonialSlides.length])

  // autoplay transforms
  useEffect(() => {
    if (paused || transformSlides.length <= 1) return
    const id = window.setInterval(() => {
      setActiveTransform((s) => (s + 1) % transformSlides.length)
    }, 6000)
    return () => clearInterval(id)
  }, [paused, transformSlides.length])

  if (testimonialSlides.length === 0 && transformSlides.length === 0) return null

  return (
    <section
      className="py-16 bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center heading-font text-2xl md:text-3xl font-extrabold text-black mb-3">
          Baddie Community 5 Star <span className="font-normal">Reviews and Transformations</span>
        </h2>

        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-1 text-black">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.455a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.371-2.455a1 1 0 00-1.176 0L5.21 17.633c-.784.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L1.22 8.085c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.958z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Testimonials carousel */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-full md:w-3/4 overflow-hidden">
            {/* slides wrapper */}
            <div
              className="flex transition-transform duration-500"
              style={{
                width: `${testimonialSlides.length * 100}%`,
                transform: `translateX(-${activeTestimonial * (100 / Math.max(1, testimonialSlides.length))}%)`,
              }}
            >
              {testimonialSlides.map((slide, sIdx) => (
                <div
                  key={sIdx}
                  // each slide must occupy the visible viewport width
                  className="flex-shrink-0 w-full px-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {slide.map((t, i) => (
                      <div key={i} className="border border-pink-100 rounded-lg p-6 bg-white">
                        <p className="normal-font text-sm text-gray-700 leading-relaxed">"{t.quote}"</p>
                        <p className="normal-font text-right text-xs font-semibold mt-4">- {t.author}</p>
                      </div>
                    ))}
                    {/* If a slide has only one item (odd number) keep spacing consistent */}
                    {slide.length === 1 && <div className="hidden md:block" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 mt-8">
            <button
              onClick={() => setActiveTestimonial((s) => (s - 1 + testimonialSlides.length) % testimonialSlides.length)}
              aria-label="Previous testimonials"
              className="w-8 h-8 rounded-full bg-pink-100 text-black flex items-center justify-center shadow-sm"
            >
              ‹
            </button>

            <div className="flex gap-2">
              {testimonialSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`Go to testimonial slide ${i + 1}`}
                  className={`w-2 h-2 rounded-full ${i === activeTestimonial ? 'bg-black' : 'bg-gray-300'}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveTestimonial((s) => (s + 1) % testimonialSlides.length)}
              aria-label="Next testimonials"
              className="w-8 h-8 rounded-full bg-pink-100 text-black flex items-center justify-center shadow-sm"
            >
              ›
            </button>
          </div>
        </div>

        {/* Transformations carousel */}
        <h3 className="heading-font text-center text-black text-xl mb-6">Transformations:</h3>

        <div className="flex flex-col items-center">
          <div className="w-full md:w-3/4 overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                width: `${transformSlides.length * 100}%`,
                transform: `translateX(-${activeTransform * (100 / Math.max(1, transformSlides.length))}%)`,
              }}
            >
              {transformSlides.map((slide, sIdx) => (
                <div key={sIdx} className="flex-shrink-0 w-full px-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {slide.map((src, i) => (
                      <div
                        key={i}
                        className="rounded-lg overflow-hidden border border-pink-100 shadow-sm bg-white h-48 flex items-center justify-center"
                      >
                        <img
                          src={src}
                          alt={`transformation-${sIdx}-${i}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // hide the broken image icon visually and keep layout
                            const el = e.currentTarget as HTMLImageElement
                            el.style.visibility = 'hidden'
                          }}
                        />
                      </div>
                    ))}
                    {/* fill empty slots if a slide has fewer than 3 images to keep grid consistent */}
                    {slide.length < 3 &&
                      Array.from({ length: 3 - slide.length }).map((_, idx) => (
                        <div key={`empty-${idx}`} className="rounded-lg border border-pink-100 h-48 bg-white" />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 mt-6">
            <button
              onClick={() => setActiveTransform((s) => (s - 1 + transformSlides.length) % transformSlides.length)}
              aria-label="Previous transformations"
              className="w-8 h-8 rounded-full bg-pink-100 text-black flex items-center justify-center shadow-sm"
            >
              ‹
            </button>

            <div className="flex gap-2">
              {transformSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTransform(i)}
                  aria-label={`Go to transform slide ${i + 1}`}
                  className={`w-2 h-2 rounded-full ${i === activeTransform ? 'bg-black' : 'bg-gray-300'}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveTransform((s) => (s + 1) % transformSlides.length)}
              aria-label="Next transformations"
              className="w-8 h-8 rounded-full bg-pink-100 text-black flex items-center justify-center shadow-sm"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}