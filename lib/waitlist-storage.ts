export interface WaitlistEntry {
  id: string;
  timestamp: string;
  goal: string | string[];
  age: string;
  guardian: string;
  gender: string;
  challenges: string;
  seriousness: string;
  commitment: string;
  experience: string;
  name: string;
  firstName: string;
  lastName: string;
  work: string;
  phone: string;
  email: string;
  instagram: string;
}

export interface WaitlistGroup {
  id: number;
  entries: WaitlistEntry[];
}

// If you use file persistence, you'll load/save waitlistGroups[] elsewhere.
let waitlistGroups: WaitlistGroup[] = [];
export const MAX_WAITLIST_SIZE = 33;

// Helper for file persistence
export function setWaitlistGroups(groups: WaitlistGroup[]) {
  waitlistGroups = groups;
}

export function getWaitlistGroups(): WaitlistGroup[] {
  return [...waitlistGroups];
}

// Adds an entry, creating new batch if needed.
export function addWaitlistEntry(entry: WaitlistEntry): { success: boolean, groupId: number } {
  let currentGroup = waitlistGroups[waitlistGroups.length - 1];
  if (!currentGroup || currentGroup.entries.length >= MAX_WAITLIST_SIZE) {
    currentGroup = { id: waitlistGroups.length + 1, entries: [] };
    waitlistGroups.push(currentGroup);
  }
  currentGroup.entries.push(entry);
  return { success: true, groupId: currentGroup.id };
}

// Count total entries in all batches.
export function getTotalWaitlistCount(): number {
  return waitlistGroups.reduce((acc, g) => acc + g.entries.length, 0);
}

// Spots left in current batch (for display only).
export function getSpotsLeftInCurrentBatch(): number {
  const current = waitlistGroups[waitlistGroups.length - 1];
  return current ? Math.max(0, MAX_WAITLIST_SIZE - current.entries.length) : MAX_WAITLIST_SIZE;
}

// Is current group full?
export function isCurrentBatchFull(): boolean {
  const current = waitlistGroups[waitlistGroups.length - 1];
  return current ? current.entries.length >= MAX_WAITLIST_SIZE : false;
}
