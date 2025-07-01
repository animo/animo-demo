'use client'

import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { useAppDispatch } from '@/hooks/hooks'
import { useAnalytics } from '@/hooks/useAnalytics'
import { usePreferences } from '@/slices/preferences/preferencesSelectors'
import { setDarkMode } from '@/slices/preferences/preferencesSlice'
import { fetchLastServerReset } from '@/slices/preferences/preferencesThunks'
import { AuthProvider } from '@/utils/AuthContext'
import { ThemeProvider } from '@/utils/ThemeContext'
import { KBar } from '@/utils/KBar'
import { ReduxProvider } from '@/components/providers/ReduxProvider'

function AppContent() {
  useAnalytics()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const { connectionDate, lastServerReset } = usePreferences()

  const localStorageTheme = typeof window !== 'undefined' && localStorage.theme === 'dark'
  const windowMedia = typeof window !== 'undefined' && !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches

  useEffect(() => {
    if (localStorageTheme || windowMedia) {
      dispatch(setDarkMode(true))
    }
  }, [dispatch, localStorageTheme, windowMedia])

  useEffect(() => {
    if (connectionDate) {
      dispatch(fetchLastServerReset())
    }
  }, [connectionDate, dispatch])

  useEffect(() => {
    if (connectionDate && lastServerReset) {
      if (connectionDate < lastServerReset) {
        router.push('/')
        dispatch({ type: 'demo/resetDemo' })
      }
    }
  }, [connectionDate, lastServerReset, router, dispatch])

  return (
    <ThemeProvider>
      <AuthProvider>
        <KBar>
          <AnimatePresence mode="wait">
            <div key={pathname}>
              {/* The page content will be rendered by the Next.js routing system */}
            </div>
          </AnimatePresence>
        </KBar>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default function ClientApp({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <AppContent>
        {children}
      </AppContent>
    </ReduxProvider>
  )
}