'use client'

import { UseCasePage } from '@/components/pages/useCase/UseCasePage'
import { PrivateRoute } from '@/utils/PrivateRoute'

export default function UseCase() {
  return (
    <PrivateRoute>
      <UseCasePage />
    </PrivateRoute>
  )
}