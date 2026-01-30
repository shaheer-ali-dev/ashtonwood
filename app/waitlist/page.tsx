'use client'

import { useState, useEffect, useRef } from 'react'

interface Question {
  id: string
  type: 'text' | 'avatar' | 'email' | 'phone' | 'textarea' | 'multiple-choice' | 'age' | 'gender' | 'yes-no' | 'guardian' | 'scale' | 'name' | 'password'
  question: string
  options?: string[]
  placeholder?: string
  required?: boolean
  multiple?: boolean
}

// Local register endpoint as requested
const REGISTER_URL = 'http://localhost:5000/register'

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
      'Event/Sport-specific training'
    ],
    multiple: true,
    required: true,
  },
  {
    id: 'age',
    type: 'text',
    question: 'How old are you?',
    placeholder: 'Enter your age (years)',
    required: true,
  },
  {
    id: 'guardian',
    type: 'guardian',
    question: "If under 18, do you have your guardian's permission?",
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
    question: 'On a scale of 1-10, how serious are you about unlocking your full potential?',
    placeholder: '',
    required: true,
  },
  {
    id: 'commitment',
    type: 'yes-no',
    question: 'My online coaching requires a financial commitment, are you ready to invest in yourself? (Personalized workouts, personalized nutrition, 1-3 check-ins per week)',
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

  // Additional fields to send to /register
  {
    id: 'height',
    type: 'text',
    question: 'What is your height? (cm)',
    placeholder: 'e.g. 180',
    required: false,
  },
  {
    id: 'weight',
    type: 'text',
    question: 'What is your weight? (kg)',
    placeholder: 'e.g. 75',
    required: false,
  },
  {
    id: 'monthlyFoodBudget',
    type: 'text',
    question: "What's your personal monthly food budget?",
    placeholder: 'e.g. $200',
    required: false,
  },
  {
    id: 'mealPrep',
    type: 'yes-no',
    question: 'Do you currently prepare your meals in advance?',
    options: ['Yes', 'No'],
    required: false,
  },
  {
    id: 'weightTrainingDaysPerWeek',
    type: 'text',
    question: 'How many days a week do you weight train on average?',
    placeholder: 'e.g. 3',
    required: false,
  },
  {
    id: 'foodAllergens',
    type: 'text',
    question: 'Do you have any food allergens?',
    placeholder: 'List allergens or "None"',
    required: false,
  },
  {
    id: 'foodRestrictions',
    type: 'text',
    question: 'Do you have any food restrictions?',
    placeholder: 'e.g. vegetarian, halal, keto, etc.',
    required: false,
  },
  {
    id: 'favoriteWholeFoods',
    type: 'text',
    question: 'What are some of your favorite whole foods?',
    placeholder: 'e.g. oats, chicken, spinach',
    required: false,
  },
  {
    id: 'favoriteMeals',
    type: 'text',
    question: 'What are some of your favorite foods/meals?',
    placeholder: 'e.g. grilled chicken salad, oats & fruit',
    required: false,
  },

  // Favorites by category - "Minimum 2 foods per category, comma-separated"
  {
    id: 'fruits',
    type: 'text',
    question: 'Favorites - Fruits (comma-separated, min 2)',
    placeholder: 'e.g. apple, banana',
    required: false,
  },
  {
    id: 'vegetables',
    type: 'text',
    question: 'Favorites - Vegetables (comma-separated, min 2)',
    placeholder: 'e.g. spinach, broccoli',
    required: false,
  },
  {
    id: 'grains',
    type: 'text',
    question: 'Favorites - Grains (comma-separated, min 2)',
    placeholder: 'e.g. rice, oats',
    required: false,
  },
  {
    id: 'dairy',
    type: 'text',
    question: 'Favorites - Dairy (comma-separated, min 2)',
    placeholder: 'e.g. yogurt, milk',
    required: false,
  },
  {
    id: 'meat',
    type: 'text',
    question: 'Favorites - Meat (comma-separated, min 2)',
    placeholder: 'e.g. chicken, beef',
    required: false,
  },

  {
    id: 'caffeine',
    type: 'yes-no',
    question: 'Do you drink caffeine?',
    options: ['Yes', 'No'],
    required: false,
  },
  {
    id: 'smoking',
    type: 'yes-no',
    question: 'Do you smoke?',
    options: ['Yes', 'No'],
    required: false,
  },
  {
    id: 'alcohol',
    type: 'yes-no',
    question: 'Do you drink alcohol?',
    options: ['Yes', 'No'],
    required: false,
  },

  {
    id: 'injuriesOrSurgeries',
    type: 'text',
    question: 'Do you have any current or past injuries, medical conditions, or surgeries?',
    placeholder: 'Describe or "None"',
    required: false,
  },
  {
    id: 'medicalConditions',
    type: 'text',
    question: 'Any current medical conditions?',
    placeholder: 'List or "None"',
    required: false,
  },
  {
    id: 'medications',
    type: 'text',
    question: 'Are you currently taking any medication or medications?',
    placeholder: 'List or "None"',
    required: false,
  },

  {
    id: 'occupation',
    type: 'text',
    question: 'What is your occupation?',
    placeholder: '',
    required: false,
  },
  {
    id: 'stressLevel',
    type: 'scale',
    question: 'How would you rate your stress levels?',
    placeholder: '',
    required: false,
  },
  {
    id: 'eatingHabitsRating',
    type: 'scale',
    question: 'How would you rate your typical daily eating habits?',
    placeholder: '',
    required: false,
  },

  {
    id: 'fitnessLevel',
    type: 'text',
    question: 'How would you rate your current fitness level?',
    placeholder: 'e.g. beginner / intermediate / advanced',
    required: false,
  },
  {
    id: 'physicalActivity',
    type: 'yes-no',
    question: 'Do you currently partake in any physical activity?',
    options: ['Yes', 'No'],
    required: false,
  },
  {
    id: 'workedWithCoachBefore',
    type: 'yes-no',
    question: 'Have you worked with a personal trainer, or an online fitness coach before?',
    options: ['Yes', 'No'],
    required: false,
  },
  {
    id: 'hasBodyWeightScale',
    type: 'yes-no',
    question: 'Do you have access to a body weight scale?',
    options: ['Yes', 'No'],
    required: false,
  },

  {
    id: 'dailyRoutine',
    type: 'textarea',
    question: 'What does your average daily routine look like?*',
    placeholder: 'Describe a typical day',
    required: false,
  },
  {
    id: 'weeklyWorkoutSplit',
    type: 'textarea',
    question: 'What does your weekly workout split look like? (If you don’t have one, leave blank.)',
    placeholder: 'Example: Monday = Legs, Tuesday = Push...',
    required: false,
  },

  {
    id: 'motivation',
    type: 'textarea',
    question: 'What motivates you?*',
    placeholder: '',
    required: false,
  },
  {
    id: 'pastChallenges',
    type: 'textarea',
    question: 'What challenges have kept you from reaching your goal(s) in the past?*',
    placeholder: '',
    required: false,
  },
  {
    id: 'coachNotes',
    type: 'textarea',
    question: 'Is there anything you’d like me to know, as your new Online fitness Coach?',
    placeholder: '',
    required: false,
  },

  // Name, contact and account fields required for registering (keep at end)
  {
    id: 'name',
    type: 'name',
    question: 'What is your name?',
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
    id: 'password',
    type: 'password',
    question: 'Create a password for your account',
    placeholder: '',
    required: true,
  },
  {
    id: 'avatar',
    type: 'avatar',
    question: 'Upload a profile picture (optional)',
    placeholder: '',
    required: false,
  },

  {
    id: 'instagram',
    type: 'text',
    question: 'What is your Instagram handle?',
    placeholder: '',
    required: false,
  },
]

export default function WaitlistPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error' | 'full'>('idle')
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const dropRef = useRef<HTMLLabelElement | null>(null)

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  // Fetch spots left on mount
  useEffect(() => {
    fetch('/api/waitlist/spots')
      .then(res => res.json())
      .then(data => setSpotsLeft(data.spotsLeft))
      .catch(err => console.error('Failed to fetch spots:', err))
  }, [])

  // drag/drop for avatar
  useEffect(() => {
    const el = dropRef.current
    if (!el) return

    const onDragOver = (e: DragEvent) => {
      e.preventDefault()
      el.classList.add('ring-2', 'ring-offset-2', 'ring-[#5A5A5A]')
    }
    const onDragLeave = () => {
      el.classList.remove('ring-2', 'ring-offset-2', 'ring-[#5A5A5A]')
    }
    const onDrop = (e: DragEvent) => {
      e.preventDefault()
      el.classList.remove('ring-2', 'ring-offset-2', 'ring-[#5A5A5A]')
      const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]
      if (f) handleAvatarChange(f)
    }

    el.addEventListener('dragover', onDragOver)
    el.addEventListener('dragleave', onDragLeave)
    el.addEventListener('drop', onDrop)

    return () => {
      el.removeEventListener('dragover', onDragOver)
      el.removeEventListener('dragleave', onDragLeave)
      el.removeEventListener('drop', onDrop)
    }
  }, [])

  // Clear errors when step changes
  useEffect(() => {
    setErrors({})
  }, [currentStep])

  // Validation for a single question using a provided answers object
  const validateAnswersForQuestion = (question: Question, answersObj: Record<string, any>) => {
    if (!question.required) return true

    if (question.type === 'name') {
      return Boolean(answersObj['firstName'] && answersObj['lastName'])
    }

    if (question.type === 'password') {
      return Boolean(answersObj['password'] && answersObj['password'].length >= 6)
    }

    const answer = answersObj[question.id]
    if (!answer) return false
    if (Array.isArray(answer) && answer.length === 0) return false
    if (typeof answer === 'string' && answer.trim() === '') return false
    return true
  }

  const handleAnswer = (value: any, immediateNext = false) => {
    const isMulti = currentQuestion.multiple === true
    const qid = currentQuestion.id

    setAnswers((prev) => {
      let next = { ...prev }

      if (isMulti) {
        const existing = Array.isArray(prev[qid]) ? prev[qid] : []
        if (existing.includes(value)) next[qid] = existing.filter((v) => v !== value)
        else next[qid] = [...existing, value]
      } else {
        next[qid] = value
      }

      // clear errors for this q
      if (errors[qid]) {
        setErrors((prevErr) => {
          const updated = { ...prevErr }
          delete updated[qid]
          return updated
        })
      }

      // auto-next only for single select fields
      if (immediateNext && !isMulti) {
        const isValid = validateAnswersForQuestion(currentQuestion, next)
        if (isValid) {
          if (currentStep < questions.length - 1) setCurrentStep((s) => s + 1)
          else handleFinalSubmit(next)
        } else {
          setErrors((prevErr) => ({
            ...prevErr,
            [qid]: ['textarea', 'text', 'email', 'phone', 'scale'].includes(currentQuestion.type)
              ? 'Please fill in all the fields'
              : 'Select an option to continue',
          }))
        }
      }

      return next
    })
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
      } else if (currentQuestion.type === 'password') {
        if (!answers['password'] || answers['password'].length < 6) {
          setErrors((prev) => ({ ...prev, [currentQuestion.id]: 'Password must be at least 6 characters' }))
          return false
        }
      } else {
        const answer = answers[currentQuestion.id]
        if (!answer || (Array.isArray(answer) && answer.length === 0) || (typeof answer === 'string' && answer.trim() === '')) {
          setErrors((prev) => ({
            ...prev,
            [currentQuestion.id]: ['textarea', 'text', 'email', 'phone', 'scale'].includes(currentQuestion.type)
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
      if (currentStep < questions.length - 1) setCurrentStep((prev) => prev + 1)
      else handleFinalSubmit(answers)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1)
  }

  const renderOptionsHardCoded = () => {
    if (!currentQuestion.options) return null
    const options = currentQuestion.options
    const rows = []

    for (let i = 0; i < options.length; i += 2) {
      const first = options[i]
      const second = options[i + 1]
      rows.push(
        <div key={i} className={`flex justify-center gap-4 mb-4`}>
          <button
            type="button"
            onClick={() => handleAnswer(first, !currentQuestion.multiple)}
            className={`px-6 py-4 rounded-[30px] border-2 text-center font-bold w-[350px] ${
              (Array.isArray(answers[currentQuestion.id]) ? answers[currentQuestion.id].includes(first) : answers[currentQuestion.id] === first)
                ? 'bg-white border-[#5A5A5A] text-gray-900 shadow-sm ring-1 ring-[#E6E7E9]'
                : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            {first}
          </button>
          {second && (
            <button
              type="button"
              onClick={() => handleAnswer(second, !currentQuestion.multiple)}
              className={`px-6 py-4 rounded-[30px] border-2 text-center font-bold w-[350px] ${
                (Array.isArray(answers[currentQuestion.id]) ? answers[currentQuestion.id].includes(second) : answers[currentQuestion.id] === second)
                  ? 'bg-white border-[#5A5A5A] text-gray-900 shadow-sm ring-1 ring-[#E6E7E9]'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {second}
            </button>
          )}
        </div>
      )
    }

    return rows
  }

  const handleNameChange = (field: 'firstName' | 'lastName', value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }))
    if (errors[currentQuestion.id]) {
      setErrors(prev => {
        const updated = { ...prev }
        delete updated[currentQuestion.id]
        return updated
      })
    }
  }

  const handleAvatarChange = (file?: File | null) => {
    if (!file) {
      setAnswers((prev) => {
        const next = { ...prev }
        delete next['avatarFile']
        return next
      })
      setAvatarPreview(null)
      return
    }

    // limit size example: 5MB
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, avatar: 'Avatar must be < 5MB' }))
      return
    }

    setAnswers((prev) => ({ ...prev, avatarFile: file }))
    const reader = new FileReader()
    reader.onload = (e) => setAvatarPreview(e.target?.result as string)
    reader.readAsDataURL(file)
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
            type={currentQuestion.type === 'email' ? 'email' : 'text'}
            value={value}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            autoComplete="off"
            className={`w-full px-4 py-3 rounded-lg border bg-white text-gray-900 ${hasError ? 'border-[#5A5A5A]' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#5A5A5A] focus:border-transparent`}
          />
        )

      case 'password':
        return (
          <input
            key={currentQuestion.id}
            type="password"
            value={value}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder || 'At least 6 characters'}
            autoComplete="new-password"
            className={`w-full px-4 py-3 rounded-lg border bg-white text-gray-900 ${hasError ? 'border-[#5A5A5A]' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#5A5A5A] focus:border-transparent`}
          />
        )

      case 'name':
        return (
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={answers.firstName || ''}
              onChange={(e) => handleNameChange('firstName', e.target.value)}
              placeholder="First Name"
              className={`w-full px-4 py-3 rounded-lg border bg-white text-gray-900 ${hasError ? 'border-[#5A5A5A]' : 'border-gray-300'}`}
            />
            <input
              type="text"
              value={answers.lastName || ''}
              onChange={(e) => handleNameChange('lastName', e.target.value)}
              placeholder="Last Name"
              className={`w-full px-4 py-3 rounded-lg border bg-white text-gray-900 ${hasError ? 'border-[#5A5A5A]' : 'border-gray-300'}`}
            />
          </div>
        )

      case 'phone':
        return (
          <div className="flex gap-2">
            <select
              className="px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900"
              value={answers.countryCode || '+92'}
              onChange={(e) => setAnswers((prev) => ({ ...prev, countryCode: e.target.value }))}
            >
              <option value="+92">🇵🇰 +92</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
            </select>
            <input
              type="tel"
              value={value}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder={currentQuestion.placeholder}
              className={`flex-1 px-4 py-3 rounded-lg border bg-white text-gray-900 ${hasError ? 'border-[#5A5A5A]' : 'border-gray-300'}`}
            />
          </div>
        )

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            rows={6}
            className={`w-full px-6 py-5 rounded-lg border bg-white text-gray-900 min-h-[250px] focus:outline-none focus:ring-2 focus:ring-[#5A5A5A] focus:border-transparent resize-y ${hasError ? 'border-[#5A5A5A]' : 'border-gray-300'}`}
          />
        )

      case 'scale':
        return (
          <div className="w-full">
            <input
              type="range"
              min="1"
              max="10"
              value={value || 1}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full h-3 bg-gray-200 rounded-lg accent-[#5A5A5A]"
            />
            <div className="flex justify-between text-xs mt-2 text-gray-700">
              {[1,2,3,4,5,6,7,8,9,10].map(num => <span key={num}>{num}</span>)}
            </div>
          </div>
        )

      case 'avatar':
        return (
          <div className="flex flex-col items-center gap-4">
            <label
              ref={dropRef}
              htmlFor="avatar-file"
              className="w-40 h-40 rounded-full bg-white border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 cursor-pointer overflow-hidden relative hover:border-gray-400 transition-all"
            >
              {avatarPreview ? (
                <>
                  <img src={avatarPreview} alt="avatar preview" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 right-2 bg-black/40 text-white text-xs px-2 py-1 rounded">Change</div>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V8.414a2 2 0 00-.586-1.414l-3.414-3.414A2 2 0 0012.586 3H4zm8 6a3 3 0 11-6 0 3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-gray-600">Upload photo</div>
                  <div className="text-xs text-gray-400">Drag & drop or click</div>
                </>
              )}
              <input
                id="avatar-file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files && e.target.files[0]
                  handleAvatarChange(f)
                }}
              />
            </label>

            {avatarPreview ? (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleAvatarChange(undefined)
                    const input = document.getElementById('avatar-file') as HTMLInputElement | null
                    if (input) input.value = ''
                  }}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm hover:bg-gray-100"
                >
                  Remove
                </button>
              </div>
            ) : null}
          </div>
        )

      case 'multiple-choice':
      case 'age':
      case 'yes-no':
      case 'guardian':
      case 'gender':
        return renderOptionsHardCoded()

      default:
        return null
    }
  }

  // Helper to convert yes/no-like answers to boolean
  const yesNoToBool = (val: any) => {
    if (typeof val === 'boolean') return val
    if (!val) return false
    const s = String(val).toLowerCase()
    return s.startsWith('y') || s === 'true' || s === 'yes' || s.includes("i'm ready")
  }

  // Final submit flow (single implementation)
  const handleFinalSubmit = (answersObj: Record<string, any>) => {
    // ensure we include firstName/lastName mapping if name is present
    // In this flow we already set firstName/lastName via handleNameChange
    handleFinalSubmitAsync(answersObj)
  }

  const handleFinalSubmitAsync = async (answersObj: Record<string, any>) => {
    await handleFinalSubmitOperation(answersObj)
  }

  const handleFinalSubmitOperation = async (finalAnswers: Record<string, any>) => {
    setIsSubmitting(true)

    try {
      // Basic required fields
      const email = finalAnswers.email
      const password = finalAnswers.password
      if (!email || !password) {
        setErrors((prev) => ({ ...prev, email: 'Email required', password: 'Password required' }))
        setIsSubmitting(false)
        return
      }

      const formData = new FormData()
      formData.append('firstName', finalAnswers.firstName ?? '')
      formData.append('lastName', finalAnswers.lastName ?? '')
      formData.append('email', email)
      formData.append('password', password)
      formData.append('role', finalAnswers.role ?? 'client')
      if (finalAnswers.challenges) formData.append('bio', finalAnswers.challenges)

      if (finalAnswers.avatarFile) formData.append('avatar', finalAnswers.avatarFile)

      // Phone number
      const phoneNumber = (finalAnswers.countryCode ?? '') + (finalAnswers.phone ?? '')
      if (phoneNumber) formData.append('phoneNumber', phoneNumber)

      // Basic numeric fields
      if (finalAnswers.gender) formData.append('gender', String(finalAnswers.gender))
      if (finalAnswers.age) formData.append('age', String(finalAnswers.age))
      if (finalAnswers.height) formData.append('height', String(finalAnswers.height))
      if (finalAnswers.weight) formData.append('weight', String(finalAnswers.weight))

      // Nutrition & lifestyle fields
      if (finalAnswers.monthlyFoodBudget) formData.append('monthlyFoodBudget', String(finalAnswers.monthlyFoodBudget))
      if (finalAnswers.mealPrep !== undefined) formData.append('mealPrep', String(yesNoToBool(finalAnswers.mealPrep)))
      if (finalAnswers.weightTrainingDaysPerWeek) formData.append('weightTrainingDaysPerWeek', String(finalAnswers.weightTrainingDaysPerWeek))
      if (finalAnswers.foodAllergens) formData.append('foodAllergens', String(finalAnswers.foodAllergens))
      if (finalAnswers.foodRestrictions) formData.append('foodRestrictions', String(finalAnswers.foodRestrictions))
      if (finalAnswers.favoriteWholeFoods) formData.append('favoriteWholeFoods', String(finalAnswers.favoriteWholeFoods))
      if (finalAnswers.favoriteMeals) formData.append('favoriteMeals', String(finalAnswers.favoriteMeals))

      // Favorite foods by category
      if (finalAnswers.fruits) formData.append('fruits', String(finalAnswers.fruits))
      if (finalAnswers.vegetables) formData.append('vegetables', String(finalAnswers.vegetables))
      if (finalAnswers.grains) formData.append('grains', String(finalAnswers.grains))
      if (finalAnswers.dairy) formData.append('dairy', String(finalAnswers.dairy))
      if (finalAnswers.meat) formData.append('meat', String(finalAnswers.meat))

      // Lifestyle booleans
      if (finalAnswers.caffeine !== undefined) formData.append('caffeine', String(yesNoToBool(finalAnswers.caffeine)))
      if (finalAnswers.smoking !== undefined) formData.append('smoking', String(yesNoToBool(finalAnswers.smoking)))
      if (finalAnswers.alcohol !== undefined) formData.append('alcohol', String(yesNoToBool(finalAnswers.alcohol)))

      // Medical
      if (finalAnswers.injuriesOrSurgeries) formData.append('injuriesOrSurgeries', String(finalAnswers.injuriesOrSurgeries))
      if (finalAnswers.medicalConditions) formData.append('medicalConditions', String(finalAnswers.medicalConditions))
      if (finalAnswers.medications) formData.append('medications', String(finalAnswers.medications))

      // Lifestyle & stress
      if (finalAnswers.occupation) formData.append('occupation', String(finalAnswers.occupation))
      if (finalAnswers.stressLevel) formData.append('stressLevel', String(finalAnswers.stressLevel))
      if (finalAnswers.eatingHabitsRating) formData.append('eatingHabitsRating', String(finalAnswers.eatingHabitsRating))

      // Fitness
      if (finalAnswers.fitnessLevel) formData.append('fitnessLevel', String(finalAnswers.fitnessLevel))
      if (finalAnswers.physicalActivity !== undefined) formData.append('physicalActivity', String(yesNoToBool(finalAnswers.physicalActivity)))
      if (finalAnswers.workedWithCoachBefore !== undefined) formData.append('workedWithCoachBefore', String(yesNoToBool(finalAnswers.workedWithCoachBefore)))
      if (finalAnswers.hasBodyWeightScale !== undefined) formData.append('hasBodyWeightScale', String(yesNoToBool(finalAnswers.hasBodyWeightScale)))

      if (finalAnswers.dailyRoutine) formData.append('dailyRoutine', String(finalAnswers.dailyRoutine))
      if (finalAnswers.weeklyWorkoutSplit) formData.append('weeklyWorkoutSplit', String(finalAnswers.weeklyWorkoutSplit))

      if (finalAnswers.motivation) formData.append('motivation', String(finalAnswers.motivation))
      if (finalAnswers.pastChallenges) formData.append('pastChallenges', String(finalAnswers.pastChallenges))
      if (finalAnswers.coachNotes) formData.append('coachNotes', String(finalAnswers.coachNotes))

      if (finalAnswers.coachId) formData.append('coachId', String(finalAnswers.coachId))
      if (finalAnswers.package) formData.append('package', String(finalAnswers.package))

      // Attempt to register user; if register fails we'll still attempt the waitlist submit,
      // but we'll console.warn the register error and continue to waitlist submission.
      try {
        const regResp = await fetch(REGISTER_URL, {
          method: 'POST',
          body: formData,
        })

        if (!regResp.ok) {
          // try to parse message
          let msg = 'Registration failed'
          try {
            const j = await regResp.json().catch(() => null)
            if (j && j.msg) msg = j.msg
            else if (j && j.error) msg = j.error
          } catch (e) {}
          console.warn('Register request failed:', msg)
          // we DO NOT abort — we continue to waitlist submission to preserve waitlist logic
        } else {
          // if register returns token store it (optional)
          try {
            const data = await regResp.json().catch(() => null)
            if (data && data.token) localStorage.setItem('token', data.token)
          } catch (e) { /* ignore */ }
        }
      } catch (e) {
        console.warn('Register request error:', e)
      }

      // Now submit to waitlist endpoint (JSON). Remove avatarFile (File) since cannot JSON.stringify it.
      const payload = { ...finalAnswers }
      delete payload.avatarFile
      // ensure phone uses full phone number with country code
      if (finalAnswers.countryCode || finalAnswers.phone) payload.phoneNumber = (finalAnswers.countryCode ?? '') + (finalAnswers.phone ?? '')

      try {
        const response = await fetch('/api/waitlist/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        const data = await response.json()

        if (response.ok) {
          setSubmissionStatus('success')
          setSpotsLeft(data.spotsLeft)
        } else if (data && data.error === 'Waitlist is full') {
          setSubmissionStatus('full')
        } else {
          setSubmissionStatus('error')
        }
      } catch (error) {
        console.error('Waitlist submission error:', error)
        setSubmissionStatus('error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render different states (success / full / error)
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
            <h1 className="text-3xl font-bold text-black mb-4 heading-font">You're on the waitlist!</h1>
            <p className="text-lg text-black mb-6 normal-font">
              Congratulations! You've secured your spot in this exclusive special offer.
              {spotsLeft !== null && spotsLeft > 0 && (
                <span className="block mt-2 font-semibold text-[#5A5A5A]">
                  Only {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} remaining!
                </span>
              )}
            </p>
            <p className="text-black normal-font mb-8">
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
            <h1 className="text-3xl font-bold text-black mb-4 heading-font">Waitlist Full</h1>
            <p className="text-lg text-black mb-6 normal-font">
              Sorry, all spots have been filled. This exclusive offer is now closed.
            </p>
            <p className="text-black normal-font mb-8">
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
            <h1 className="text-3xl font-bold text-black mb-4 heading-font">Oops! Something went wrong</h1>
            <p className="text-lg text-black mb-8 normal-font">
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

  // Main questionnaire UI (kept layout from original)
  return (
    <section className="py-20 bg-[#FAF9F6] min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with spots left */}
        <div className="text-center mb-8">
          <div className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold text-lg mb-4">
            🔥 EXCLUSIVE SPECIAL OFFER 🔥
          </div>
          {spotsLeft !== null && (
            <p className="text-[#5A5A5A] font-semibold text-xl">
              {spotsLeft} / 125 Spots Remaining
            </p>
          )}
        </div>

        <h2 className="text-4xl heading-font md:text-5xl font-bold text-[#5A5A5A] mb-6 text-center">
          Join the Waitlist
        </h2>
        <p className="text-center text-black mb-12 normal-font text-lg">
          Limited spots — don't miss this exclusive training opportunity!
        </p>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
            <div className="h-full bg-[#5A5A5A] transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Current question */}
        <div className="mb-8">
          <h3 className="text-xl normal-font md:text-2xl font-bold text-black mb-8 text-center whitespace-pre-line">
            {currentQuestion.question}
          </h3>

          <div className="mb-4 normal-font">{renderInput()}</div>

          {currentQuestion.type === 'scale' && (
            <div className="text-center text-2xl font-bold text-[#5A5A5A] mt-4">
              {answers[currentQuestion.id] || 1}
            </div>
          )}

          {errors[currentQuestion.id] && (
            <p className="text-[#5A5A5A] normal-font text-sm mt-2 text-center">{errors[currentQuestion.id]}</p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between normal-font gap-4 mt-12">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-8 py-4 rounded-lg normal-font font-semibold text-black transition-all ${
              currentStep === 0
                ? 'opacity-50 cursor-not-allowed bg-white border-2 border-black'
                : 'bg-white border-2 border-black hover:bg-black'
            }`}
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={() => {
              if (currentStep < questions.length - 1) {
                if (validateCurrentStep()) handleNext()
              } else {
                if (validateCurrentStep()) handleFinalSubmit(answers)
              }
            }}
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