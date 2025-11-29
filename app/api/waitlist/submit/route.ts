import { NextRequest, NextResponse } from 'next/server';
import {
  addWaitlistEntry,
  getSpotsLeftInCurrentBatch,
  isCurrentBatchFull,
  getWaitlistGroups,
  setWaitlistGroups,
  type WaitlistEntry,
} from '@/lib/waitlist-storage';

import fs from 'fs';
import path from 'path';

// File for persistence
const FILE_PATH = path.join(process.cwd(), 'waitlist.json');

// Load batches from file if it exists!
function loadAllGroupsFromFile() {
  if (fs.existsSync(FILE_PATH)) {
    try {
      const fileContents = fs.readFileSync(FILE_PATH, 'utf8');
      const data = JSON.parse(fileContents);
      if (Array.isArray(data)) setWaitlistGroups(data); // Set to memory
      else setWaitlistGroups([]);
    } catch {
      setWaitlistGroups([]);
    }
  }
}

// Save batches to file
function saveAllGroupsToFile(groups: any) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(groups, null, 2), 'utf8');
}

export async function POST(request: NextRequest) {
  try {
    loadAllGroupsFromFile(); // always load latest

    const body = await request.json();

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
    };

    // Add to batch
    const { success, groupId } = addWaitlistEntry(newEntry);

    // Save to file after adding
    saveAllGroupsToFile(getWaitlistGroups());

    // Calculate spots left in current batch
    const spotsLeft = getSpotsLeftInCurrentBatch();

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully added to waitlist',
        spotsLeft,
        groupId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to process your submission.' },
      { status: 500 }
    );
  }
}
