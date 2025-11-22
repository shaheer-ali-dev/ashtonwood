'use client'

import { useEffect } from 'react'

export default function SuccessPage() {
  useEffect(() => {
    // Redirect to Typeform after 2 seconds
    const timer = setTimeout(() => {
      // Replace with your actual Typeform URL
      const typeformUrl = process.env.NEXT_PUBLIC_TYPEFORM_URL || 'https://your-typeform-url.typeform.com/to/your-form-id'
      window.location.href = typeformUrl
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Redirecting to your custom questionnaire...
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  )
}

