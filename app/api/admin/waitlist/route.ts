import { NextResponse } from 'next/server'
import { getWaitlistGroups } from '@/lib/waitlist-storage'

export async function GET() {
  try {
    const groups = getWaitlistGroups();
    return NextResponse.json({
      success: true,
      groups,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
