// Simple in-memory storage for waitlist submissions
// Note: This will reset when the serverless function cold starts
// For production, use Vercel KV, Postgres, or another persistent database

export interface WaitlistEntry {
  id: string
  timestamp: string
  goal: string | string[]
  age: string
  guardian: string
  gender: string
  challenges: string
  seriousness: string
  commitment: string
  experience: string
  name: string
  firstName: string
  lastName: string
  work: string
  phone: string
  email: string
  instagram: string
}

// In-memory storage (temporary solution)
let waitlistEntries: WaitlistEntry[] = []

export const MAX_WAITLIST_SIZE = 33

export function getWaitlistEntries(): WaitlistEntry[] {
  return [...waitlistEntries]
}

export function addWaitlistEntry(entry: WaitlistEntry): boolean {
  if (waitlistEntries.length >= MAX_WAITLIST_SIZE) {
    return false
  }
  waitlistEntries.push(entry)
  return true
}

export function getWaitlistCount(): number {
  return waitlistEntries.length
}

export function getSpotsLeft(): number {
  return Math.max(0, MAX_WAITLIST_SIZE - waitlistEntries.length)
}

export function isWaitlistFull(): boolean {
  return waitlistEntries.length >= MAX_WAITLIST_SIZE
}
