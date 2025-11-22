import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const FILE_PATH = path.join(process.cwd(), 'waitlist.json')

function readEntriesFromFile() {
  if (!fs.existsSync(FILE_PATH)) return []

  const fileContents = fs.readFileSync(FILE_PATH, 'utf8')

  try {
    return JSON.parse(fileContents)
  } catch (err) {
    console.error('Invalid JSON in waitlist file:', err)
    return []
  }
}

const MAX_WAITLIST_SIZE = 33 // your limit

export async function GET() {
  try {
    const entries = readEntriesFromFile()

    const filled = entries.length
    const spotsLeft = Math.max(0, MAX_WAITLIST_SIZE - filled)
    const isFull = filled >= MAX_WAITLIST_SIZE

    return NextResponse.json(
      {
        total: MAX_WAITLIST_SIZE,
        filled,
        spotsLeft,
        isFull,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error reading waitlist:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
