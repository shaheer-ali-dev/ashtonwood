import { NextResponse } from 'next/server'
import { WaitlistEntry } from '@/lib/waitlist-storage'
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


export async function GET() {
  try {
    const entries = readEntriesFromFile()

    return NextResponse.json(
      {
        entries,
        count: entries.length,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error reading waitlist entries:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }

}
