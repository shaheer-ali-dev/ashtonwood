'use client'

import React, { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const REGISTER_URL = 'http://localhost:5000/register'

export default function PricingSection() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPaymentChoice, setShowPaymentChoice] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  // ✅ CHECK IF USER CAME FROM QUESTIONNAIRE
  const isUnlocked = useMemo(() => {
    return searchParams.get('from') === 'questionnaire'
  }, [searchParams])

  const plans = [
    {
      id: 'yearly',
      name: 'Yearly Plan',
      price: '$75',
      duration: 'per month',
      billing: 'Billed yearly',
      highlight: true,
    },
    {
      id: '6month',
      name: '6 Month Plan',
      price: '$100',
      duration: 'per month',
      billing: 'Billed every 6 months',
      highlight: false,
    },
  ]

  const submitRegistration = async (planId: string) => {
    try {
      setServerError(null)
      setLoading(true)

      const stored = localStorage.getItem('questionnaire_answers')
      if (!stored) {
        setServerError('No questionnaire data found in localStorage.')
        setLoading(false)
        return
      }

      let parsed: any
      try {
        parsed = JSON.parse(stored)
      } catch {
        setServerError('Failed to parse stored questionnaire data.')
        setLoading(false)
        return
      }

      const answers = parsed.answers ?? parsed
      const formData = new FormData()

      for (const key in answers) {
        const val = answers[key]
        if (val === undefined || val === null) continue

        if (typeof val === 'object') {
          formData.append(key, JSON.stringify(val))
        } else {
          formData.append(key, String(val))
        }
      }

      formData.append('package', planId)

      const resp = await fetch(REGISTER_URL, {
        method: 'POST',
        body: formData,
      })

      if (!resp.ok) {
        const text = await resp.text().catch(() => '')
        throw new Error(text || `Registration failed with status ${resp.status}`)
      }

      const data = await resp.json().catch(() => ({}))
      if (data.token) {
        localStorage.setItem('token', data.token)
      }

      window.location.href = '/#pricing?from=questionnaire&registered=1'
    } catch (err: any) {
      setServerError(err?.message || 'Failed to register. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChoosePlan = (plan: { id: string; highlight?: boolean }) => {
    if (!isUnlocked) return
    setSelectedPlan(plan.id)
    submitRegistration(plan.id)

    if (plan.highlight) {
      setShowPaymentChoice(true)
    }
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
              sustainable transformation.
            </p>

            {/* 🔒 HUMAN EXPERT ASSURANCE (THIS IS THE KEY PART) */}
            <p className="normal-font mt-6 text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Every program is personally designed and reviewed by an experienced coach —
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

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-8 flex flex-col justify-between transition ${
                  plan.highlight ? 'border-black shadow-lg' : 'border-black/20'
                } ${!isUnlocked ? 'opacity-60' : ''}`}
              >
                <div>
                  {plan.highlight && (
                    <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-wide bg-black text-white px-3 py-1 rounded-full">
                      Best Value
                    </span>
                  )}

                  <h3 className="heading-font text-2xl font-bold text-black mb-2">
                    {plan.name}
                  </h3>

                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-extrabold text-black">
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
                  onClick={() => handleChoosePlan(plan)}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    !isUnlocked
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : plan.highlight
                      ? 'bg-black text-white hover:bg-black/90'
                      : 'bg-black/10 text-black hover:bg-black/20'
                  }`}
                >
                  {loading && selectedPlan === plan.id
                    ? 'Processing...'
                    : isUnlocked
                    ? 'Choose Plan'
                    : 'Locked'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENT OVERLAY */}
      {showPaymentChoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl text-center">
            <h3 className="text-2xl font-bold mb-6">Choose Your Payment Option</h3>

            <div className="space-y-4">
              <button
                onClick={() =>
                  (window.location.href =
                    'https://buy.stripe.com/3cIcN7gwkb8c5VV7DD8N20b')
                }
                className="w-full py-4 rounded-lg bg-black text-white font-semibold"
              >
                Pay Upfront (Best Value)
              </button>

              <button
                onClick={() => router.push('/agreement_yearly')}
                className="w-full py-4 rounded-lg bg-black/10 text-black font-semibold"
              >
                Monthly Recurring Payment
              </button>
            </div>

            <button
              onClick={() => setShowPaymentChoice(false)}
              className="mt-6 text-sm text-gray-500 hover:text-black"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}
