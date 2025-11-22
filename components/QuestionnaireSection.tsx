'use client'

import { useState, useEffect } from 'react'

const redirectToStripe = () => {
  // Stripe payment link
  const stripeLink = 'https://buy.stripe.com/cNi4gBcg4gswfwv0bb8N202'

  // Typeform redirect after payment
  const typeformLink = 'https://form.typeform.com/to/t6JbY3W4'

  // Using Stripe Checkout "success_url" trick
  // If your Stripe link supports appending ?success_url=..., you can do:
  window.location.href = `${stripeLink}?success_url=${encodeURIComponent(typeformLink)}`
}

interface Question {
  id: string
  type: 'text' | 'email' | 'phone' | 'textarea' | 'multiple-choice' | 'age' | 'gender' | 'yes-no' | 'scale' | 'guardian' | 'name'
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


export default function QuestionnaireSection() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

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

  const handleNext = () => {
  if (validateCurrentStep()) {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Last step - redirect to Stripe
      redirectToStripe()
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
            // Male and Female side by side, Other below
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

  return (
    <section id="questionnaire" className="py-20 bg-[#FAF9F6] min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Top motivational text */}
        <div className="text-right mb-8">
          
        </div>

        {/* Main heading */}
        <h2 className="text-4xl heading-font md:text-5xl font-bold text-[#5A5A5A] mb-6 text-center">
          Fill this out to get started!
        </h2>

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
            className="px-8 py-4 rounded-lg normal-font font-semibold bg-[#5A5A5A] text-white border-2 border-[#5A5A5A] hover:bg-[#FF5A8A] transition-all"
          >
            {currentStep === questions.length - 1 ? 'Submit' : 'Next →'}
          </button>
        </div>
      </div>
    </section>
  )
}
