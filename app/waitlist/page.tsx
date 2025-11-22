'use client'

import { useState, useEffect } from 'react'

interface Question {
  id: string
  type: 'text' | 'email' | 'phone' | 'textarea' | 'multiple-choice' | 'age' | 'gender' | 'yes-no' | 'guardian' | 'scale' | 'name'
  question: string
  options?: string[]
  placeholder?: string
  required?: boolean
}

const questions: Question[] = [
  {
    id: 'goal',
    type: 'multiple-choice',
    question: 'What is your primary fitness/personal goal? (This can be multiple things!)',
    options: [
      'Fat Loss (cut)',
      'Muscle Gain (bulk)',
      'Recomposition (tone)',
      'Improve flexibility/mobility',
      'Event/Sport-specific training',
    ],
    required: true,
  },
  {
    id: 'age',
    type: 'age',
    question: 'How old are you?',
    options: ['Under 18', '18-24', '25-31', '32+'],
    required: true,
  },
  {
    id: 'guardian',
    type: 'guardian',
    question: 'If under 18, do you have your guardians permission?',
    options: ['Yes', 'No', 'Not under 18'],
    required: true,
  },
  {
    id: 'gender',
    type: 'gender',
    question: 'What is your gender?',
    options: ['Male', 'Female', 'Other'],
    required: true,
  },
  {
    id: 'challenges',
    type: 'textarea',
    question: 'What challenges or feelings are you experiencing that are driving you to become a better version of yourself? How will it feel to lock in and give yourself the effort you deserve?',
    placeholder: '',
    required: true,
  },
  {
    id: 'seriousness',
    type: 'scale',
    question: 'On a scale of 1-10, how serious are you about unlocking your full baddie potential?',
    placeholder: '',
    required: true,
  },
  {
    id: 'commitment',
    type: 'yes-no',
    question: 'My online coaching requires a financial commitment, are you ready to invest in yourself? (Custom workouts, personalized nutrition, weekly check-ins, habit tracking, 1:1 messaging with me)',
    options: ["Yes I'm ready to commit", 'No I am not ready'],
    required: true,
  },
  {
    id: 'experience',
    type: 'textarea',
    question: 'What do you want to get most from this experience? How do you imagine feeling once you\'ve built new habits and the confidence you deserve?',
    placeholder: '',
    required: true,
  },
  {
    id: 'name',
    type: 'name',
    question: 'What is your name?',
    placeholder: '',
    required: true,
  },
  {
    id: 'work',
    type: 'text',
    question: 'What do you do for work/school?',
    placeholder: '',
    required: true,
  },
  {
    id: 'phone',
    type: 'phone',
    question: 'What is your phone number?',
    placeholder: '0301 2345678',
    required: true,
  },
  {
    id: 'email',
    type: 'email',
    question: 'What is your e-mail address?',
    placeholder: '',
    required: true,
  },
  {
    id: 'instagram',
    type: 'text',
    question: 'What is your Instagram handle?',
    placeholder: '',
    required: true,
  },
]

export default function WaitlistPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error' | 'full'>('idle')
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null)

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  // Fetch spots left on mount
  useEffect(() => {
    fetch('/api/waitlist/spots')
      .then(res => res.json())
      .then(data => setSpotsLeft(data.spotsLeft))
      .catch(err => console.error('Failed to fetch spots:', err))
  }, [])

  // Clear errors when step changes
  useEffect(() => {
    setErrors({})
  }, [currentStep])

  const handleAnswer = (value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
    // Clear error when user provides an answer
    if (errors[currentQuestion.id]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[currentQuestion.id]
        return newErrors
      })
    }
  }

  const validateCurrentStep = (): boolean => {
    if (currentQuestion.required) {
      if (currentQuestion.type === 'name') {
        const firstName = answers['firstName']
        const lastName = answers['lastName']
        if (!firstName || !lastName) {
          setErrors((prev) => ({
            ...prev,
            [currentQuestion.id]: 'Please fill in all the fields',
          }))
          return false
        }
      } else {
        const answer = answers[currentQuestion.id]
        if (!answer || (Array.isArray(answer) && answer.length === 0) || (typeof answer === 'string' && answer.trim() === '')) {
          setErrors((prev) => ({
            ...prev,
            [currentQuestion.id]: currentQuestion.type === 'textarea' || currentQuestion.type === 'text' || currentQuestion.type === 'email' || currentQuestion.type === 'phone' || currentQuestion.type === 'scale'
              ? 'Please fill in all the fields'
              : 'Select an option to continue',
          }))
          return false
        }
      }
    }
    return true
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/waitlist/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmissionStatus('success')
        setSpotsLeft(data.spotsLeft)
      } else if (data.error === 'Waitlist is full') {
        setSubmissionStatus('full')
      } else {
        setSubmissionStatus('error')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmissionStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < questions.length - 1) {
        setCurrentStep((prev) => prev + 1)
      } else {
        // Last step - submit to waitlist
        handleSubmit()
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const renderInput = () => {
    const value = answers[currentQuestion.id] || ''
    const hasError = !!errors[currentQuestion.id]

    switch (currentQuestion.type) {
      case 'text':
      case 'email':
        return (
          <input
            key={currentQuestion.id}
            type={currentQuestion.type}
            value={value}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            autoComplete="off"
            className={`w-full px-4 py-3 rounded-lg border bg-white text-gray-900 ${
              hasError ? 'border-[#5A5A5A]' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-[#5A5A5A] focus:border-transparent`}
          />
        )

      case 'name':
        const firstName = answers['firstName'] || ''
        const lastName = answers['lastName'] || ''
        return (
          <div className="grid grid-cols-2 gap-4">
            <input
              key="firstName"
              type="text"
              value={firstName}
              onChange={(e) => {
                const newFirstName = e.target.value
                setAnswers((prev) => ({
                  ...prev,
                  firstName: newFirstName,
                  name: `${newFirstName} ${prev.lastName || ''}`.trim()
                }))
                if (errors[currentQuestion.id]) {
                  setErrors((prev) => {
                    const newErrors = { ...prev }
                    delete newErrors[currentQuestion.id]
                    return newErrors
                  })
                }
              }}
              placeholder="First Name"
              autoComplete="given-name"
              className={`w-full px-4 py-3 rounded-lg border bg-white text-gray-900 ${
                hasError ? 'border-[#5A5A5A]' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#5A5A5A] focus:border-transparent`}
            />
            <input
              key="lastName"
              type="text"
              value={lastName}
              onChange={(e) => {
                const newLastName = e.target.value
                setAnswers((prev) => ({
                  ...prev,
                  lastName: newLastName,
                  name: `${prev.firstName || ''} ${newLastName}`.trim()
                }))
                if (errors[currentQuestion.id]) {
                  setErrors((prev) => {
                    const newErrors = { ...prev }
                    delete newErrors[currentQuestion.id]
                    return newErrors
                  })
                }
              }}
              placeholder="Last Name"
              autoComplete="family-name"
              className={`w-full px-4 py-3 rounded-lg border bg-white text-gray-900 ${
                hasError ? 'border-[#5A5A5A]' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#5A5A5A] focus:border-transparent`}
            />
          </div>
        )

      case 'phone':
        const phoneValue = value || ''
        return (
          <div className="flex gap-2">
            <select
              className="px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#5A5A5A] text-gray-900"
              defaultValue="+92"
            >
              <option value="+92">🇵🇰 +92</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
            </select>
            <input
              key={currentQuestion.id}
              type="tel"
              value={phoneValue}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder={currentQuestion.placeholder}
              autoComplete="tel"
              className={`flex-1 px-4 py-3 rounded-lg border bg-white text-gray-900 ${
                hasError ? 'border-[#5A5A5A]' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#5A5A5A] focus:border-transparent`}
            />
          </div>
        )

      case 'textarea':
        return (
          <textarea
            key={currentQuestion.id}
            value={value}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            rows={6}
            className={`w-full px-6 py-5 rounded-lg border bg-white text-gray-900 min-h-[250px] focus:outline-none focus:ring-2 focus:ring-[#5A5A5A] focus:border-transparent resize-y ${
              hasError ? 'border-[#5A5A5A]' : 'border-gray-300'
            }`}
          />
        )

      case 'scale':
        return (
          <input
            key={currentQuestion.id}
            type="range"
            min="1"
            max="10"
            value={value || 1}
            onChange={(e) => handleAnswer(e.target.value)}
            className="w-full h-3 bg-gray-200 rounded-lg accent-[#5A5A5A]"
          />
        )

      case 'multiple-choice':
      case 'age':
      case 'gender':
      case 'yes-no':
      case 'guardian':
        const selected = answers[currentQuestion.id] || (currentQuestion.type === 'multiple-choice' ? [] : '')
        const isSelected = (option: string) => {
          if (currentQuestion.type === 'multiple-choice') {
            return Array.isArray(selected) && selected.includes(option)
          }
          return selected === option
        }

        const handleOptionClick = (option: string) => {
          if (currentQuestion.type === 'multiple-choice') {
            const current = Array.isArray(selected) ? selected : []
            if (current.includes(option)) {
              handleAnswer(current.filter((o) => o !== option))
            } else {
              handleAnswer([...current, option])
            }
          } else {
            handleAnswer(option)
          }
        }

        const getLayoutClass = () => {
          if (currentQuestion.type === 'age') return 'grid grid-cols-2 gap-3'
          if (currentQuestion.type === 'gender') {
            return 'space-y-3'
          }
          if (currentQuestion.type === 'guardian') return 'space-y-3'
          if (currentQuestion.type === 'yes-no') return 'grid grid-cols-2 gap-3'
          return 'space-y-3'
        }

        const getGenderLayout = () => {
          if (currentQuestion.type === 'gender') {
            return (
              <>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {currentQuestion.options?.slice(0, 2).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleOptionClick(option)}
                      className={`w-full px-6 py-4 rounded-lg border-2 text-left transition-all font-medium ${
                        isSelected(option)
                          ? 'bg-white border-[#5A5A5A] text-gray-900'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {currentQuestion.options?.slice(2).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleOptionClick(option)}
                    className={`w-full px-6 py-4 rounded-lg border-2 text-left transition-all font-medium ${
                      isSelected(option)
                        ? 'bg-white border-[#5A5A5A] text-gray-900'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </>
            )
          }
          return null
        }

        if (currentQuestion.type === 'gender') {
          return <div>{getGenderLayout()}</div>
        }

        return (
          <div className={getLayoutClass()}>
            {currentQuestion.options?.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOptionClick(option)}
                className={`w-full px-6 py-4 rounded-lg border-2 text-left transition-all font-medium ${
                  isSelected(option)
                    ? 'bg-white border-[#5A5A5A] text-gray-900'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  // Success screen
  if (submissionStatus === 'success') {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 heading-font">You're on the waitlist!</h1>
            <p className="text-lg text-gray-600 mb-6 normal-font">
              Congratulations! You've secured your spot in this exclusive special offer.
              {spotsLeft !== null && spotsLeft > 0 && (
                <span className="block mt-2 font-semibold text-[#5A5A5A]">
                  Only {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} remaining!
                </span>
              )}
            </p>
            <p className="text-gray-600 normal-font mb-8">
              We'll contact you soon with next steps. Check your email for confirmation!
            </p>
            <a
              href="/"
              className="inline-block px-8 py-4 bg-[#5A5A5A] text-white rounded-lg font-semibold hover:bg-[#FF5A8A] transition-all normal-font"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Waitlist full screen
  if (submissionStatus === 'full') {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 heading-font">Waitlist Full</h1>
            <p className="text-lg text-gray-600 mb-6 normal-font">
              Sorry, all 33 spots have been filled. This exclusive offer is now closed.
            </p>
            <p className="text-gray-600 normal-font mb-8">
              Stay tuned for future opportunities by following us on social media!
            </p>
            <a
              href="/"
              className="inline-block px-8 py-4 bg-[#5A5A5A] text-white rounded-lg font-semibold hover:bg-[#FF5A8A] transition-all normal-font"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Error screen
  if (submissionStatus === 'error') {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 heading-font">Oops! Something went wrong</h1>
            <p className="text-lg text-gray-600 mb-8 normal-font">
              We couldn't submit your application. Please try again.
            </p>
            <button
              onClick={() => {
                setSubmissionStatus('idle')
                setCurrentStep(0)
              }}
              className="inline-block px-8 py-4 bg-[#5A5A5A] text-white rounded-lg font-semibold hover:bg-[#FF5A8A] transition-all normal-font"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Questionnaire form
  return (
    <section className="py-20 bg-[#FAF9F6] min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with spots left */}
        <div className="text-center mb-8">
          <div className="inline-block bg-[#FF5A8A] text-white px-6 py-3 rounded-full font-bold text-lg mb-4">
            🔥 EXCLUSIVE SPECIAL OFFER 🔥
          </div>
          {spotsLeft !== null && (
            <p className="text-[#5A5A5A] font-semibold text-xl">
              {spotsLeft} / 33 Spots Remaining
            </p>
          )}
        </div>

        {/* Main heading */}
        <h2 className="text-4xl heading-font md:text-5xl font-bold text-[#5A5A5A] mb-6 text-center">
          Join the Waitlist
        </h2>
        <p className="text-center text-gray-600 mb-12 normal-font text-lg">
          Limited to 33 people only - Don't miss this exclusive training opportunity!
        </p>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
            <div
              className="h-full bg-[#5A5A5A] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-xl normal-font md:text-2xl font-bold text-gray-900 mb-8 text-center">
            {currentQuestion.question}
          </h3>

          {/* Input field */}
          <div className="mb-4 normal-font">{renderInput()}</div>

          {/* Show current scale value */}
          {currentQuestion.type === 'scale' && (
            <div className="text-center text-2xl font-bold text-[#5A5A5A] mt-4">
              {answers[currentQuestion.id] || 1}
            </div>
          )}

          {/* Error message */}
          {errors[currentQuestion.id] && (
            <p className="text-[#5A5A5A] normal-font text-sm mt-2 text-center">{errors[currentQuestion.id]}</p>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between normal-font gap-4 mt-12">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-8 py-4 rounded-lg normal-font font-semibold text-gray-900 transition-all ${
              currentStep === 0
                ? 'opacity-50 cursor-not-allowed bg-white border-2 border-gray-300'
                : 'bg-white border-2 border-black hover:bg-gray-50'
            }`}
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="px-8 py-4 rounded-lg normal-font font-semibold bg-[#5A5A5A] text-white border-2 border-[#5A5A5A] hover:bg-[#FF5A8A] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : currentStep === questions.length - 1 ? 'Join Waitlist' : 'Next →'}
          </button>
        </div>
      </div>
    </section>
  )
}
