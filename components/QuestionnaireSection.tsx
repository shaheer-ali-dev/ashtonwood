'use client'

import { useState, useEffect, useRef } from 'react'

const REGISTER_URL = 'http://localhost:5000/register'

// NOTE: Data is now sent to REGISTER_URL and user redirected to Calendly after final submit

interface Question {
  id: string
  type: 'text' | 'email' | 'phone' | 'textarea' | 'multiple-choice' | 'age' | 'gender' | 'yes-no' | 'scale' | 'guardian' | 'name' | 'password' | 'avatar' | 'budget-start' | 'budget-total'
  question: string
  options?: string[]
  placeholder?: string
  required?: boolean
  multiple?: boolean
}

// Budget options for starting investment (quarterly)
const STARTING_BUDGET_OPTIONS = [
  { label: 'Under $750', value: 'under_750', passes: false },
  { label: '$750 – $999', value: '750_999', passes: true },
  { label: '$1,000 – $1,499', value: '1000_1499', passes: true },
  { label: '$1,500+', value: '1500_plus', passes: true },
]

// Budget options for total program investment
const TOTAL_BUDGET_OPTIONS = [
  { label: 'Under $1,000', value: 'under_1000', passes: false },
  { label: '$1,000 – $1,999', value: '1000_1999', passes: false },
  { label: '$2,000 – $2,999', value: '2000_2999', passes: false },
  { label: '$3,000+', value: '3000_plus', passes: true },
]

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
    question: 'My online coaching requires a financial\n commitment, are  you ready to invest in yourself? \n(Personalized workouts, personalized nutrition,  1-3 check-in\n days per week, all-around support)',
    options: ["Yes I'm ready to commit", 'No I am not ready'],
    required: true,
  },
  {
    id: 'experience',
    type: 'textarea',
    question: 'What do you want to get most from this experience?\n How do you imagine feeling once you\'ve built new \nhabits and the confidence you deserve?',
    placeholder: '',
    required: true,
  },

  // --- ADDITIONAL QUESTIONS TO SEND TO /register ---
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
    question: 'What does your weekly workout split look like? (If you don\'t have one, leave blank.)',
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
    question: 'Is there anything you\'d like me to know, as your new Online fitness Coach?',
    placeholder: '',
    required: false,
  },

  // ✅ NEW: Budget filter question 1 — Starting investment (quarterly)
  {
    id: 'budgetStart',
    type: 'budget-start',
    question: 'To get started, coaching is billed quarterly at $750.\nWhat starting investment are you comfortable with?',
    required: true,
  },

  // ✅ NEW: Budget filter question 2 — Total program investment (from image)
  {
    id: 'budgetTotal',
    type: 'budget-total',
    question: 'If accepted into the program, what level of investment are you comfortable making toward your full transformation?',
    required: true,
  },

  // Name, contact and account fields
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
    id: 'instagram',
    type: 'text',
    question: 'What is your Instagram handle?',
    placeholder: '',
    required: false,
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function checkBudgetPasses(answers: Record<string, any>): { passes: boolean; failedField: 'budgetStart' | 'budgetTotal' | null } {
  const startOpt = STARTING_BUDGET_OPTIONS.find((o) => o.value === answers['budgetStart'])
  const totalOpt = TOTAL_BUDGET_OPTIONS.find((o) => o.value === answers['budgetTotal'])

  if (startOpt && !startOpt.passes) return { passes: false, failedField: 'budgetStart' }
  if (totalOpt && !totalOpt.passes) return { passes: false, failedField: 'budgetTotal' }
  return { passes: true, failedField: null }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function QuestionnaireSection() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  // 'questions' | 'declined' | 'success'
  const [endState, setEndState] = useState<'questions' | 'declined' | 'success'>('questions')
  const dropRef = useRef<HTMLLabelElement | null>(null)
  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  useEffect(() => {
    setErrors({})
  }, [currentStep])

  useEffect(() => {
    const el = dropRef.current
    if (!el) return
    const onDragOver = (e: DragEvent) => { e.preventDefault(); el.classList.add('ring-2', 'ring-offset-2', 'ring-[#5A5A5A]') }
    const onDragLeave = () => el.classList.remove('ring-2', 'ring-offset-2', 'ring-[#5A5A5A]')
    const onDrop = (e: DragEvent) => { e.preventDefault(); el.classList.remove('ring-2', 'ring-offset-2', 'ring-[#5A5A5A]'); const f = e.dataTransfer?.files[0]; if (f) handleAvatarChange(f) }
    el.addEventListener('dragover', onDragOver)
    el.addEventListener('dragleave', onDragLeave)
    el.addEventListener('drop', onDrop)
    return () => { el.removeEventListener('dragover', onDragOver); el.removeEventListener('dragleave', onDragLeave); el.removeEventListener('drop', onDrop) }
  }, [])

  const validateAnswersForQuestion = (question: Question, answersObj: Record<string, any>) => {
    if (!question.required) return true
    if (question.type === 'name') return Boolean(answersObj['firstName'] && answersObj['lastName'])
    if (question.type === 'password') return Boolean(answersObj['password'] && answersObj['password'].length >= 6)
    if (question.type === 'budget-start') return Boolean(answersObj['budgetStart'])
    if (question.type === 'budget-total') return Boolean(answersObj['budgetTotal'])
    const answer = answersObj[question.id]
    if (!answer) return false
    if (Array.isArray(answer) && answer.length === 0) return false
    if (typeof answer === 'string' && answer.trim() === '') return false
    return true
  }

  const handleAnswer = (value: any, immediateNext = false) => {
    if (currentQuestion.multiple) {
      setAnswers((prev) => {
        const existing: any[] = Array.isArray(prev[currentQuestion.id]) ? prev[currentQuestion.id] : []
        const newArray = existing.includes(value) ? existing.filter((v: any) => v !== value) : [...existing, value]
        return { ...prev, [currentQuestion.id]: newArray }
      })
      return
    }

    setAnswers((prev) => {
      const next = { ...prev, [currentQuestion.id]: value }
      if (errors[currentQuestion.id]) setErrors((prevErr) => { const u = { ...prevErr }; delete u[currentQuestion.id]; return u })
      if (immediateNext) {
        const isValid = validateAnswersForQuestion(currentQuestion, next)
        if (isValid) {
          if (currentStep < questions.length - 1) setCurrentStep((s) => s + 1)
          else handleFinalSubmit(next)
        } else {
          setErrors((prevErr) => ({ ...prevErr, [currentQuestion.id]: 'Select an option to continue' }))
        }
      }
      return next
    })
  }

  const validateCurrentStep = (): boolean => {
    if (!currentQuestion.required) return true

    if (currentQuestion.type === 'name') {
      if (!answers['firstName'] || !answers['lastName']) { setErrors((prev) => ({ ...prev, [currentQuestion.id]: 'Please fill in all the fields' })); return false }
    } else if (currentQuestion.type === 'password') {
      if (!answers['password'] || answers['password'].length < 6) { setErrors((prev) => ({ ...prev, [currentQuestion.id]: 'Password must be at least 6 characters' })); return false }
    } else if (currentQuestion.type === 'budget-start') {
      if (!answers['budgetStart']) { setErrors((prev) => ({ ...prev, budgetStart: 'Please select an option to continue' })); return false }
    } else if (currentQuestion.type === 'budget-total') {
      if (!answers['budgetTotal']) { setErrors((prev) => ({ ...prev, budgetTotal: 'Please select an option to continue' })); return false }
    } else {
      const answer = answers[currentQuestion.id]
      if (!answer || (Array.isArray(answer) && answer.length === 0) || (typeof answer === 'string' && answer.trim() === '')) {
        setErrors((prev) => ({ ...prev, [currentQuestion.id]: ['textarea', 'text', 'email', 'phone', 'scale'].includes(currentQuestion.type) ? 'Please fill in all the fields' : 'Select an option to continue' }))
        return false
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

  // ── Budget selector renderers ────────────────────────────────────────────

  const renderBudgetOptions = (
    options: { label: string; value: string; passes: boolean }[],
    fieldKey: string
  ) => {
    return (
      <div className="grid grid-cols-1 gap-3 w-full max-w-xl mx-auto">
        {options.map((opt) => {
          const selected = answers[fieldKey] === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setAnswers((prev) => ({ ...prev, [fieldKey]: opt.value }))
                if (errors[fieldKey]) setErrors((prev) => { const u = { ...prev }; delete u[fieldKey]; return u })
              }}
              className={`w-full px-6 py-5 rounded-[30px] border-2 text-left font-bold text-base transition-all ${
                selected
                  ? 'bg-white border-[#5A5A5A] text-gray-900 shadow-md ring-1 ring-[#5A5A5A]'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selected ? 'border-[#5A5A5A] bg-[#5A5A5A]' : 'border-gray-400'}`}>
                  {selected && <span className="w-2 h-2 rounded-full bg-white block" />}
                </span>
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>
    )
  }

  // ── Options renderer ─────────────────────────────────────────────────────

  const renderOptionsHardCoded = () => {
    if (!currentQuestion.options) return null
    const options = currentQuestion.options
    const rows = []
    for (let i = 0; i < options.length; i += 2) {
      const first = options[i]; const second = options[i + 1]
      rows.push(
        <div key={i} className="flex justify-center gap-4 mb-4">
          <button type="button" onClick={() => handleAnswer(first, !currentQuestion.multiple)}
            className={`px-6 py-4 rounded-[30px] border-2 text-center font-bold w-[350px] ${(Array.isArray(answers[currentQuestion.id]) ? answers[currentQuestion.id].includes(first) : answers[currentQuestion.id] === first) ? 'bg-white border-[#5A5A5A] text-gray-900 shadow-sm ring-1 ring-[#E6E7E9]' : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'}`}>
            {first}
          </button>
          {second && (
            <button type="button" onClick={() => handleAnswer(second, !currentQuestion.multiple)}
              className={`px-6 py-4 rounded-[30px] border-2 text-center font-bold w-[350px] ${(Array.isArray(answers[currentQuestion.id]) ? answers[currentQuestion.id].includes(second) : answers[currentQuestion.id] === second) ? 'bg-white border-[#5A5A5A] text-gray-900 shadow-sm ring-1 ring-[#E6E7E9]' : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'}`}>
              {second}
            </button>
          )}
        </div>
      )
    }
    return rows
  }

  const handleNameChange = (field: 'firstName' | 'lastName', value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }))
    if (errors[currentQuestion.id]) setErrors((prev) => { const u = { ...prev }; delete u[currentQuestion.id]; return u })
  }

  const handleAvatarChange = (file?: File | null) => {
    if (!file) { setAnswers((prev) => { const n = { ...prev }; delete n['avatarFile']; return n }); setAvatarPreview(null); return }
    if (file.size > 5 * 1024 * 1024) { setServerError('Avatar must be < 5MB'); return }
    setAnswers((prev) => ({ ...prev, avatarFile: file }))
    const reader = new FileReader(); reader.onload = (e) => setAvatarPreview(e.target?.result as string); reader.readAsDataURL(file)
  }

  const renderInput = () => {
    const value = answers[currentQuestion.id] || ''
    const hasError = !!errors[currentQuestion.id]

    switch (currentQuestion.type) {
      case 'budget-start':
        return renderBudgetOptions(STARTING_BUDGET_OPTIONS, 'budgetStart')

      case 'budget-total':
        return renderBudgetOptions(TOTAL_BUDGET_OPTIONS, 'budgetTotal')

      case 'text':
      case 'email':
        return (
          <input key={currentQuestion.id} type={currentQuestion.type === 'email' ? 'email' : 'text'} value={value}
            onChange={(e) => handleAnswer(e.target.value)} placeholder={currentQuestion.placeholder} autoComplete="off"
            className={`w-full px-4 py-3 rounded-lg border bg-white text-gray-900 ${hasError ? 'border-[#5A5A5A]' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#5A5A5A] focus:border-transparent`} />
        )

      case 'password':
        return (
          <input key={currentQuestion.id} type="password" value={value} onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder || 'At least 6 characters'} autoComplete="new-password"
            className={`w-full px-4 py-3 rounded-lg border bg-white text-gray-900 ${hasError ? 'border-[#5A5A5A]' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#5A5A5A] focus:border-transparent`} />
        )

      case 'name':
        return (
          <div className="grid grid-cols-2 gap-4">
            <input type="text" value={answers.firstName || ''} onChange={(e) => handleNameChange('firstName', e.target.value)} placeholder="First Name"
              className={`w-full px-4 py-3 rounded-lg border bg-white text-gray-900 ${hasError ? 'border-[#5A5A5A]' : 'border-gray-300'}`} />
            <input type="text" value={answers.lastName || ''} onChange={(e) => handleNameChange('lastName', e.target.value)} placeholder="Last Name"
              className={`w-full px-4 py-3 rounded-lg border bg-white text-gray-900 ${hasError ? 'border-[#5A5A5A]' : 'border-gray-300'}`} />
          </div>
        )

      case 'phone':
        return (
          <div className="flex gap-2">
            <select className="px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900" value={answers.countryCode || '+92'}
              onChange={(e) => setAnswers((prev) => ({ ...prev, countryCode: e.target.value }))}>
              <option value="+92">🇵🇰 +92</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
            </select>
            <input type="tel" value={value} onChange={(e) => handleAnswer(e.target.value)} placeholder={currentQuestion.placeholder}
              className={`flex-1 px-4 py-3 rounded-lg border bg-white text-gray-900 ${hasError ? 'border-[#5A5A5A]' : 'border-gray-300'}`} />
          </div>
        )

      case 'textarea':
        return (
          <textarea value={value} onChange={(e) => handleAnswer(e.target.value)} placeholder={currentQuestion.placeholder} rows={6}
            className={`w-full px-6 py-5 rounded-lg border bg-white text-gray-900 min-h-[250px] focus:outline-none focus:ring-2 focus:ring-[#5A5A5A] focus:border-transparent resize-y ${hasError ? 'border-[#5A5A5A]' : 'border-gray-300'}`} />
        )

      case 'scale':
        return (
          <div className="w-full">
            <input type="range" min="1" max="10" value={value || 1} onChange={(e) => handleAnswer(e.target.value)} className="w-full h-3 bg-gray-200 rounded-lg accent-[#5A5A5A]" />
            <div className="flex justify-between text-xs mt-2 text-gray-700">
              {[1,2,3,4,5,6,7,8,9,10].map((num) => <span key={num}>{num}</span>)}
            </div>
          </div>
        )

      case 'avatar':
        return (
          <div className="flex flex-col items-center gap-4">
            <label ref={dropRef} htmlFor="avatar-file"
              className="w-40 h-40 rounded-full bg-white border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 cursor-pointer overflow-hidden relative hover:border-gray-400 transition-all">
              {avatarPreview ? (
                <><img src={avatarPreview} alt="avatar preview" className="w-full h-full object-cover" /><div className="absolute bottom-2 right-2 bg-black/40 text-white text-xs px-2 py-1 rounded">Change</div></>
              ) : (
                <><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V8.414a2 2 0 00-.586-1.414l-3.414-3.414A2 2 0 0012.586 3H4zm8 6a3 3 0 11-6 0 3 3 0 016 0z" clipRule="evenodd" /></svg><div className="text-sm text-gray-600">Upload photo</div><div className="text-xs text-gray-400">Drag & drop or click</div></>
              )}
              <input id="avatar-file" type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; handleAvatarChange(f) }} />
            </label>
            {avatarPreview && (
              <button type="button" onClick={() => { handleAvatarChange(undefined); const input = document.getElementById('avatar-file') as HTMLInputElement | null; if (input) input.value = '' }}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm hover:bg-gray-100">Remove</button>
            )}
            {currentQuestion.required && <p className="text-sm text-gray-600">Required</p>}
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

  // ── Final submit ─────────────────────────────────────────────────────────

  const handleFinalSubmit = async (finalAnswers: Record<string, any>) => {
    try {
      setLoading(true)
      setServerError(null)

      const safeAnswers: Record<string, any> = { ...finalAnswers }
      if (safeAnswers.avatarFile) { safeAnswers.avatar = avatarPreview || ''; delete safeAnswers.avatarFile }

      // ✅ Budget filter check
      const { passes } = checkBudgetPasses(safeAnswers)

      // Save to localStorage regardless
      const payload = { answers: safeAnswers, timestamp: new Date().toISOString(), budgetPassed: passes }
      localStorage.setItem('questionnaire_answers', JSON.stringify(payload))

      // Send to backend
      const formData = new FormData()
      for (const key in safeAnswers) {
        const val = safeAnswers[key]
        if (val === undefined || val === null) continue
        formData.append(key, typeof val === 'object' ? JSON.stringify(val) : String(val))
      }
      formData.append('budgetPassed', String(passes))

      try {
        const resp = await fetch(REGISTER_URL, { method: 'POST', body: formData })
        const data = await resp.json().catch(() => ({}))
        if (data.token) localStorage.setItem('token', data.token)
      } catch (fetchErr) {
        console.error('Fetch error to register URL:', fetchErr)
      }

      if (passes) {
        // ✅ PASSED — redirect to Calendly
        window.location.href = 'https://calendly.com/imashtonlifts/30min'
      } else {
        // ❌ DECLINED — show professional message
        setEndState('declined')
      }
    } catch (err: any) {
      console.error('Final submit error', err)
      setServerError('Failed to complete registration. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Declined screen ───────────────────────────────────────────────────────

  if (endState === 'declined') {
    return (
      <section id="questionnaire" className="py-1 bg-[#E5E7EB] min-h-screen flex items-center">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-200">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#5A5A5A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 heading-font">Thank You for Applying</h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6 normal-font">
              We truly appreciate your time and the courage it takes to invest in yourself — that alone says a lot about who you are.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-6 normal-font">
              At this time, we aren't able to move forward with your application. Our coaching program is a full-year commitment starting at <strong>$750 quarterly</strong>, and we want to make sure every client we take on is set up for long-term success — financially and physically.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-8 normal-font">
              This isn't a permanent door closing. When the timing is right and you're ready to commit fully, we'd love to hear from you again. Keep working on yourself — your transformation is worth it.
            </p>

            <div className="border-t border-gray-100 pt-6">
              <p className="text-sm text-gray-500 normal-font">
                Questions? Feel free to reach out on Instagram for more information about future opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── Main questionnaire ────────────────────────────────────────────────────

  return (
    <section id="questionnaire" className="py-1 bg-[#E5E7EB] min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl heading-font md:text-3xl font-bold text-black mb-6 text-center">FILL THIS OUT TO GET STARTED!</h2>

        <div className="mb-12">
          <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
            <div className="h-full bg-[#5A5A5A] transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl normal-font md:text-2xl font-bold text-gray-900 mb-8 text-center whitespace-pre-line">{currentQuestion.question}</h3>
          <div className="mb-4 normal-font">{renderInput()}</div>
          {errors[currentQuestion.id] && <p className="text-[#5A5A5A] normal-font text-sm mt-2 text-center">{errors[currentQuestion.id]}</p>}
          {/* Also show budget-specific field errors */}
          {currentQuestion.type === 'budget-start' && errors['budgetStart'] && <p className="text-[#5A5A5A] normal-font text-sm mt-2 text-center">{errors['budgetStart']}</p>}
          {currentQuestion.type === 'budget-total' && errors['budgetTotal'] && <p className="text-[#5A5A5A] normal-font text-sm mt-2 text-center">{errors['budgetTotal']}</p>}
        </div>

        {serverError && <p className="text-red-600 text-center mb-4">{serverError}</p>}

        <div className="flex justify-between normal-font gap-4 mt-12">
          <button type="button" onClick={handlePrevious} disabled={currentStep === 0 || loading}
            className={`px-8 py-4 rounded-lg normal-font font-bold bg-transparent text-black border-2 border-[#5A5A5A] transition-all ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}>
            ← Previous
          </button>
          <button type="button" onClick={handleNext} disabled={loading}
            className="px-8 py-4 rounded-lg normal-font font-bold bg-white text-black border-2 border-[#5A5A5A] hover:bg-gray-100 transition-all">
            {loading ? 'Submitting...' : currentStep === questions.length - 1 ? 'Submit' : 'Next →'}
          </button>
        </div>
      </div>
    </section>
  )
}
