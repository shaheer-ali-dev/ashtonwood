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

// If you use file persistence, always load/save waitlistGroups[] elsewhere!
let waitlistGroups: WaitlistGroup[] = [];
export const MAX_WAITLIST_SIZE = 33;

// Set from file database
export function setWaitlistGroups(groups: WaitlistGroup[]) {
  waitlistGroups = Array.isArray(groups) ? groups : [];
}

// Main getter for batches
export function getWaitlistGroups(): WaitlistGroup[] {
  return [...waitlistGroups];
}

// Defensive getter: always returns a real current batch group!
export function getCurrentGroup(): WaitlistGroup {
  if (
    waitlistGroups.length === 0 ||
    !waitlistGroups[waitlistGroups.length - 1] ||
    !Array.isArray(waitlistGroups[waitlistGroups.length - 1].entries)
  ) {
    const newGroup: WaitlistGroup = { id: waitlistGroups.length + 1, entries: [] };
    waitlistGroups.push(newGroup);
    return newGroup;
  }
  return waitlistGroups[waitlistGroups.length - 1];
}

// How many spots are left in current batch
export function getSpotsLeftInCurrentBatch(): number {
  const currentGroup = getCurrentGroup();
  return Math.max(0, MAX_WAITLIST_SIZE - currentGroup.entries.length);
}

// Add an entry to current or new batch (never throws!)
export function addWaitlistEntry(entry: WaitlistEntry): { success: boolean, groupId: number } {
  let currentGroup = getCurrentGroup();
  if (currentGroup.entries.length >= MAX_WAITLIST_SIZE) {
    currentGroup = { id: waitlistGroups.length + 1, entries: [] };
    waitlistGroups.push(currentGroup);
  }
  currentGroup.entries.push(entry);
  return { success: true, groupId: currentGroup.id };
}

// How many batches (groups) exist?
export function getBatchCount(): number {
  return waitlistGroups.length;
}

// Overall entry count
export function getTotalWaitlistCount(): number {
  return waitlistGroups.reduce((sum, group) => sum + group.entries.length, 0);
}
