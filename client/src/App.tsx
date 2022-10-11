import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

import { wsUrl } from './api/BaseUrl'
import { useAppDispatch } from './hooks/hooks'
import { useAnalytics } from './hooks/useAnalytics'
import { useInterval } from './hooks/useInterval'
import { PageNotFound } from './pages/PageNotFound'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { LandingPage } from './pages/landing/LandingPage'
import { OnboardingPage } from './pages/onboarding/OnboardingPage'
import { UseCasePage } from './pages/useCase/UseCasePage'
import { usePreferences } from './slices/preferences/preferencesSelectors'
import { setDarkMode } from './slices/preferences/preferencesSlice'
import { fetchLastServerReset } from './slices/preferences/preferencesThunks'
import { AuthProvider } from './utils/AuthContext'
import { PrivateRoute } from './utils/PrivateRoute'
import { ThemeProvider } from './utils/ThemeContext'

function App() {
  useAnalytics()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { connectionDate, lastServerReset } = usePreferences()

  const localStorageTheme = localStorage.theme === 'dark'
  const windowMedia = !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches

  useEffect(() => {
    if (localStorageTheme || windowMedia) {
      dispatch(setDarkMode(true))
    }
  }, [dispatch, localStorageTheme, windowMedia])

  useEffect(() => {
    if (connectionDate) {
      dispatch(fetchLastServerReset())
    }
  }, [connectionDate])

  useEffect(() => {
    if (connectionDate && lastServerReset) {
      if (connectionDate < lastServerReset) {
        navigate('/')
        dispatch({ type: 'demo/resetDemo' })
      }
    }
  }, [connectionDate, lastServerReset])

  useInterval(async () => {
    const client = new WebSocket(wsUrl)

    await new Promise(() => {
      client.addEventListener('message', (event) => {
        // eslint-disable-next-line no-console
        console.log(event.data)
        dispatch({ type: 'demo/event', action: event })
      })
    })
  }, 1)

  return (
    <ThemeProvider>
      <AuthProvider>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/demo" element={<OnboardingPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/uc/:slug"
              element={
                <PrivateRoute>
                  <UseCasePage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AnimatePresence>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
