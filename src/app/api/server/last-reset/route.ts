import { NextRequest, NextResponse } from 'next/server'

// This replaces the /server/last-reset endpoint
export async function GET() {
  // For now, return a mock date - this will be replaced with actual agent cleanup logic
  const lastReset = new Date().toISOString()
  return NextResponse.json(lastReset)
}