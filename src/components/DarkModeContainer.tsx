import { useMediaQuery } from 'react-responsive'

import { useAppDispatch } from '../hooks/hooks'
import { useDarkMode } from '../hooks/useDarkMode'
import { setDarkMode } from '../slices/preferences/preferencesSlice'

import { DarkModeSwitch, MiniDarkModeSwitch } from './DarkModeSwitcher'

export const DarkModeContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const darkMode = useDarkMode()

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const handleDarkMode = () => {
    if (darkMode) {
      dispatch(setDarkMode(false))
      return
    }
    dispatch(setDarkMode(true))
  }

  return isMobile ? (
    <MiniDarkModeSwitch darkMode={darkMode} handleDarkMode={handleDarkMode} />
  ) : (
    <DarkModeSwitch darkMode={darkMode} handleDarkMode={handleDarkMode} />
  )
}
