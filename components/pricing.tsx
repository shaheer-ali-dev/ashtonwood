'use client'

import React, { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PricingSection() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPaymentChoice, setShowPaymentChoice] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  // ✅ CHECK IF USER CAME FROM QUESTIONNAIRE
  const isUnlocked = useMemo(() => {
    return searchParams.get('from') === 'questionnaire'
  }, [searchParams])

  const plan = {
    id: 'yearly',
    name: 'Yearly Plan',
    price: '$3,000',
    duration: 'per year',
    billing: 'Billed once yearly',
    highlight: true,
  }

  const paymentOptions = [
    {
      id: 'upfront',
      name: 'Pay Upfront',
      description: 'Best Value',
      amount: '$3,000',
      frequency: 'One-time payment',
      link: 'https://buy.stripe.com/00wcN7a7Weko3NNbTT8N20f',
    },
    {
      id: 'quarterly',
      name: 'Quarterly Payments',
      description: 'Every 3 months',
      amount: '$750',
      frequency: 'Paid 4 times per year',
      link: 'https://buy.stripe.com/00w9AVcg47W0bgf1ff8N20g',
    },
    {
      id: 'half-payment',
      name: 'Half Payment',
      description: 'Every 6 months',
      amount: '$1,500',
      frequency: 'Paid 2 times per year',
      link: 'https://buy.stripe.com/fZubJ33Jy0ty6ZZ0bb8N20h',
    },
  ]

  const handleChoosePlan = () => {
    if (!isUnlocked) return
    setShowPaymentChoice(true)
  }

  const handlePaymentOptionClick = (link: string) => {
    window.location.href = link
  }

  return (
    <>
      <section id="pricing" className="relative py-20 bg-white transition">
        <div className="max-w-6xl mx-auto px-6">

          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="heading-font text-3xl md:text-4xl font-extrabold text-black">
              SIMPLE & TRANSPARENT PRICING
            </h2>

            <p className="normal-font mt-4 text-gray-600 max-w-2xl mx-auto">
              Sculpt By Ashton – 1:1 Online Fitness Coaching designed for real,
              sustainable transformation. <br />
              <strong>Results guaranteed. If results are not achieved, money back guaranteed</strong>
            </p>

            {/* 🔒 HUMAN EXPERT ASSURANCE (THIS IS THE KEY PART) */}
            <p className="normal-font mt-6 text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Every program is personally designed and reviewed by an Experienced & certified coach —
              <strong> never auto-generated or AI-built.</strong> Your training, nutrition,
              and progression are manually adjusted based on your body, performance,
              and real-world feedback.
            </p>

            <div className="mt-4">
              <span className="inline-block text-sm font-medium text-black bg-black/5 px-4 py-2 rounded-full">
                ✓ Human-Coached • ✓ Manually Customized • ✓ No AI-Generated Plans
              </span>
            </div>

            {!isUnlocked && (
              <p className="mt-4 text-sm text-gray-500">
                Complete the questionnaire to unlock pricing options
              </p>
            )}
          </div>

          {serverError && (
            <div className="mb-6 text-center text-red-600">{serverError}</div>
          )}

          {/* Single Pricing Card */}
          <div className="max-w-lg mx-auto">
            <div
              className={`rounded-xl border p-8 flex flex-col justify-between transition ${
                plan.highlight ? 'border-black shadow-lg' : 'border-black/20'
              } ${!isUnlocked ? 'opacity-60' : ''}`}
            >
              <div>
                {plan.highlight && (
                  <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-wide bg-black text-white px-3 py-1 rounded-full">
                    Only Plan Available
                  </span>
                )}

                <h3 className="heading-font text-2xl font-bold text-black mb-2">
                  {plan.name}
                </h3>

                <div className="flex items-end gap-2 mb-4">
                  <span className="text-5xl font-extrabold text-black">
                    {plan.price}
                  </span>
                  <span className="text-sm text-gray-600">{plan.duration}</span>
                </div>

                <p className="text-sm text-gray-500 mb-6">{plan.billing}</p>

                <ul className="text-sm text-gray-700 space-y-3 mb-8">
                  <li>✔ 1:1 Online Coaching</li>
                  <li>✔ Personalized Workout Program</li>
                  <li>✔ Custom Nutrition Guidance</li>
                  <li>✔ Weekly Check-ins</li>
                  <li>✔ Direct Coach Support</li>
                </ul>
              </div>

              <button
                disabled={!isUnlocked || loading}
                onClick={handleChoosePlan}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  !isUnlocked
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-black/90'
                }`}
              >
                {loading ? 'Processing...' : isUnlocked ? 'Choose Plan' : 'Fill our the Questionaire'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT OPTIONS OVERLAY */}
      {showPaymentChoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-8 max-w-4xl w-full shadow-xl">
            <h3 className="text-3xl font-bold mb-2 text-center">Choose Your Payment Plan</h3>
            <p className="text-center text-gray-600 mb-8">Select the payment option that works best for you</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {paymentOptions.map((option) => (
                <div
                  key={option.id}
                  className="border border-black/20 rounded-lg p-6 flex flex-col justify-between hover:border-black transition cursor-pointer"
                  onClick={() => handlePaymentOptionClick(option.link)}
                >
                  <div>
                    <h4 className="text-xl font-bold text-black mb-2">{option.name}</h4>
                    <p className="text-xs text-gray-500 mb-4">{option.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-3xl font-extrabold text-black">{option.amount}</span>
                      <p className="text-sm text-gray-600 mt-2">{option.frequency}</p>
                    </div>

                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>✔ Full yearly access</li>
                      <li>✔ All features included</li>
                      {option.id === 'upfront' && <li>✔ Best value</li>}
                    </ul>
                  </div>

                  <button className="w-full mt-6 py-3 rounded-lg bg-black text-white font-semibold hover:bg-black/90 transition">
                    Select {option.name}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowPaymentChoice(false)}
              className="w-full text-center text-sm text-gray-500 hover:text-black"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}