import type { ReactChild, ReactFragment, ReactPortal } from 'react'

import { createContext } from 'react'

import { usePreferences } from '../slices/preferences/preferencesSelectors'

export const ThemeContext = createContext({ darkMode: false })

export function ThemeProvider(props: {
  children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined
}) {
  const { darkMode } = usePreferences()

  return <ThemeContext.Provider value={{ darkMode }}>{props.children}</ThemeContext.Provider>
}
