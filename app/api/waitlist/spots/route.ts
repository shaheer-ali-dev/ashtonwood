import { NextResponse } from 'next/server';
import { getWaitlistGroups, getSpotsLeftInCurrentBatch } from '@/lib/waitlist-storage';
import fs from 'fs';
import path from 'path';

const FILE_PATH = path.join(process.cwd(), 'waitlist.json');

function loadAllGroupsFromFile() {
  if (fs.existsSync(FILE_PATH)) {
    try {
      const fileContents = fs.readFileSync(FILE_PATH, 'utf8');
      const data = JSON.parse(fileContents);
      if (Array.isArray(data)) return data;
      else return [];
    } catch {
      return [];
    }
  }
  return [];
}

export async function GET() {
  try {
    const groups = loadAllGroupsFromFile();
    const currentGroup = groups[groups.length - 1] || { entries: [] };
    const filled = currentGroup.entries.length;
    const spotsLeft = Math.max(0, 33 - filled);
    const isFull = filled >= 33;

    return NextResponse.json(
      {
        total: 33,
        filled,
        spotsLeft,
        isFull,
        batch: groups.length // Which batch is open
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
