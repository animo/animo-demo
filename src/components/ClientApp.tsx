'use client'

import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { useAnalytics } from '@/hooks/useAnalytics'
import { usePreferences } from '@/contexts/AppStateContext'
import { AuthProvider } from '@/utils/AuthContext'
import { ThemeProvider } from '@/utils/ThemeContext'
import { KBar } from '@/utils/KBar'
import ReactQueryProvider from '@/components/providers/ReactQueryProvider'
import { AppStateProvider } from '@/contexts/AppStateContext'

function AppContent({ children }: { children: React.ReactNode }) {
  useAnalytics()
  const router = useRouter()
  const pathname = usePathname()
  const { connectionDate, lastServerReset, setDarkMode } = usePreferences()

  const localStorageTheme = typeof window !== 'undefined' && localStorage.theme === 'dark'
  const windowMedia = typeof window !== 'undefined' && !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches

  useEffect(() => {
    if (localStorageTheme || windowMedia) {
      setDarkMode(true)
    }
  }, [setDarkMode, localStorageTheme, windowMedia])

  useEffect(() => {
    if (connectionDate && lastServerReset) {
      if (connectionDate < lastServerReset) {
        router.push('/')
        // TODO: Reset demo state
      }
    }
  }, [connectionDate, lastServerReset, router])

  return (
    <ThemeProvider>
      <AuthProvider>
        <KBar>
          <AnimatePresence mode="wait">
            <div key={pathname}>
              {children}
            </div>
          </AnimatePresence>
        </KBar>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default function ClientApp({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <AppStateProvider>
        <AppContent>
          {children}
        </AppContent>
      </AppStateProvider>
    </ReactQueryProvider>
  )
}