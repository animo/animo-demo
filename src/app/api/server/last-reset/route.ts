import { NextRequest, NextResponse } from 'next/server'

// This replaces the /server/last-reset endpoint
export async function GET() {
  try {
    // For now, return a static date to avoid agent initialization during build
    // This will be properly implemented when running with agent
    const lastReset = new Date().toISOString()
    return NextResponse.json(lastReset)
  } catch (error) {
    return NextResponse.json(new Date().toISOString())
  }
}