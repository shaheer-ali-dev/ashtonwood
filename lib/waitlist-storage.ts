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
export interface WaitlistGroup {
  id: number; // 1, 2, 3, ...
  entries: WaitlistEntry[];
}
// In-memory storage (temporary solution)
let waitlistEntries: WaitlistEntry[] = []

export const MAX_WAITLIST_SIZE = 33

export function getWaitlistEntries(): WaitlistEntry[] {
  return [...waitlistEntries]
}

export function addWaitlistEntry(entry: WaitlistEntry): { success: boolean, groupId?: number } {
  let currentGroup = waitlistGroups[waitlistGroups.length - 1];
  if (!currentGroup || currentGroup.entries.length >= MAX_WAITLIST_SIZE) {
    currentGroup = { id: (waitlistGroups.length + 1), entries: [] };
    waitlistGroups.push(currentGroup);
  }
  currentGroup.entries.push(entry);
  return { success: true, groupId: currentGroup.id };
}

/* Utility: Total count */
export function getTotalWaitlistCount(): number {
  return waitlistGroups.reduce((acc, g) => acc + g.entries.length, 0);
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

