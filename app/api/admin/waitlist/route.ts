import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { setWaitlistGroups, getWaitlistGroups, WaitlistGroup } from '@/lib/waitlist-storage';

const FILE_PATH = path.join(process.cwd(), 'waitlist.json');

function loadGroupsFromFile(): WaitlistGroup[] {
  if (!fs.existsSync(FILE_PATH)) return [];
  try {
    const raw = fs.readFileSync(FILE_PATH, 'utf8');
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    setWaitlistGroups(loadGroupsFromFile());
    return NextResponse.json({ success: true, groups: getWaitlistGroups() }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
