import { useContext } from 'react'

import { ThemeContext } from '../utils/ThemeContext'

export const useDarkMode = () => useContext(ThemeContext).darkMode
