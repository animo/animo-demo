import React from 'react'
import { FiX } from 'react-icons/fi'

import animoDark from '../../../assets/dark/animo-logo-dark.png'
import cheqdDark from '../../../assets/dark/cheqd-logo-word-dark.png'
import animoLight from '../../../assets/light/animo-logo-light.png'
import cheqdLight from '../../../assets/light/cheqd-logo-word-light.png'
import { useDarkMode } from '../../../hooks/useDarkMode'

export const Footer: React.FC = () => {
  const darkMode = useDarkMode()

  return (
    <div className="flex dark:text-white justify-center content-center select-none my-8 pb-4 sm:my-4">
      <a href="https://animo.id" target="_blank" className="flex justify-center align-middle">
        <img className="m-2 h-3" src={darkMode ? animoDark : animoLight} alt="animo-credentials-home" />{' '}
        <FiX className="flex my-2.5 h-2 w-3" />
        <img className="m-1 h-5" src={darkMode ? cheqdDark : cheqdLight} alt="cheqd-credentials-home" />
      </a>
    </div>
  )
}
