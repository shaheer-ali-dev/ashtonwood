'use client'

import React from 'react'

export default function OneManTeamSection() {
  return (
    <section className="py-10 bg-[#E5E7EB] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        
        <div className="md:w-2/3">
          <h3 className="heading-font text-3xl md:text-3xl font-extrabold text-black mb-4">
            ONE MAN TEAM. NO SHORTCUTS.
          </h3>

          <p className="normal-font text-gray-700 text-base md:text-lg">
            I want to make it very clear that I do not have an assistant. I do not have a robot. 
            And I do not have anyone helping me with my coaching.
          </p>
          <br />

          <p className="normal-font text-gray-700 text-base md:text-lg">
            I am a one man team—and I take pride in that. Every single aspect of your coaching is handled directly by me.
            Nothing is outsourced. Nothing is automated. Nothing is passed off.
          </p>
          <br />

          <p className="normal-font text-gray-700 text-base md:text-lg">
            I build your program from scratch. I make adjustments when needed. I respond to your emails and
            your DMs inside the coaching app. I track progress, review feedback, and make decisions based on you—not templates.
          </p>
          <br />

          <p className="normal-font text-gray-700 text-base md:text-lg">
            I handle literally everything when it comes to 1:1 coaching. That means real attention, real accountability,
            and real investment in your progress.
          </p>
          <br />

          <p className="normal-font text-gray-700 text-base md:text-lg font-semibold">
            Once again—it's just me for 1:1 coaching. And I take pride in delivering high-level coaching
            through true one-on-one work.
          </p>
        </div>

        <div className="md:w-1/3 flex justify-center md:justify-end">
          <div className="w-64 md:w-72 lg:w-96">
            <img
              src="/images/coach.jpg"
              alt="1:1 Coaching"
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
