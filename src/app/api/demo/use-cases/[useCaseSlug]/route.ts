import { NextRequest, NextResponse } from 'next/server'

import useCases from '@/lib/server/content/UseCases'

export async function GET(
  request: NextRequest,
  { params }: { params: { useCaseSlug: string } }
) {
  try {
    // Find the use case across all character use cases
    const useCase = useCases
      .find((u) => u.useCases.find((y) => y.slug === params.useCaseSlug))
      ?.useCases.find((z) => z.slug === params.useCaseSlug)

    if (!useCase) {
      return NextResponse.json({ error: 'Use case not found' }, { status: 404 })
    }

    return NextResponse.json(useCase)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch use case' }, { status: 500 })
  }
}