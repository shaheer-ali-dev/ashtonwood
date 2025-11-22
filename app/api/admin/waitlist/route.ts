import { NextResponse } from 'next/server'
import { getWaitlistEntries } from '@/lib/waitlist-storage'

export async function GET() {
  try {
    const entries = getWaitlistEntries()

    // Sort by timestamp, most recent first
    entries.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })

    return NextResponse.json(
      {
        success: true,
        entries,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error reading waitlist entries:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
