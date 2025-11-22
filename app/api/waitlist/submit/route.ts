import { NextRequest, NextResponse } from 'next/server'
import {
  addWaitlistEntry,
  getSpotsLeft,
  getWaitlistCount,
  isWaitlistFull,
  MAX_WAITLIST_SIZE,
  type WaitlistEntry
} from '@/lib/waitlist-storage'

import fs from 'fs'
import path from 'path'

const FILE_PATH = path.join(process.cwd(), 'waitlist.json')

function saveEntryToFile(entry: any) {
  let data = []

  // Read existing data (if file exists)
  if (fs.existsSync(FILE_PATH)) {
    const fileContents = fs.readFileSync(FILE_PATH, 'utf8')
    try {
      data = JSON.parse(fileContents)
    } catch (err) {
      data = [] // If JSON is broken, start fresh
    }
  }

  // Add new entry
  data.push(entry)

  // Save updated JSON
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf8')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Check if waitlist is full
    if (isWaitlistFull()) {
      return NextResponse.json(
        { error: 'Waitlist is full', message: 'All 33 spots have been filled.' },
        { status: 400 }
      )
    }

    // Create new entry
    const newEntry: WaitlistEntry = {
      id: `waitlist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      goal: body.goal || '',
      age: body.age || '',
      guardian: body.guardian || '',
      gender: body.gender || '',
      challenges: body.challenges || '',
      seriousness: body.seriousness || '',
      commitment: body.commitment || '',
      experience: body.experience || '',
      name: body.name || '',
      firstName: body.firstName || '',
      lastName: body.lastName || '',
      work: body.work || '',
      phone: body.phone || '',
      email: body.email || '',
      instagram: body.instagram || '',
    }
    saveEntryToFile(newEntry)

    // Add to waitlist
    const success = addWaitlistEntry(newEntry)

    if (!success) {
      return NextResponse.json(
        { error: 'Waitlist is full', message: 'All 33 spots have been filled.' },
        { status: 400 }
      )
    }

    // Calculate spots left
    const spotsLeft = getSpotsLeft()
    const position = getWaitlistCount()

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully added to waitlist',
        spotsLeft,
        position,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing waitlist submission:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to process your submission.' },
      { status: 500 }
    )
  }
}
