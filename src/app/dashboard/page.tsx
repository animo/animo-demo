'use client'

import { DashboardPage } from '@/components/pages/dashboard/DashboardPage'
import { PrivateRoute } from '@/utils/PrivateRoute'

export default function Dashboard() {
  return (
    <PrivateRoute>
      <DashboardPage />
    </PrivateRoute>
  )
}