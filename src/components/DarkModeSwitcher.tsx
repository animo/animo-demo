import React from 'react'

import { Line } from '../assets/Line'
import { TriangleDark } from '../assets/dark/TriangleDark'
import { TriangleLight } from '../assets/light/TriangleLight'

export interface Props {
  darkMode: boolean
  handleDarkMode(): void
}

export const DarkModeSwitch: React.FC<Props> = ({ darkMode, handleDarkMode }) => {
  return (
    <div onClick={() => handleDarkMode()} className="flex items-center text-sm text-center py-3">
      <p className={`${!darkMode && 'font-semibold'}  flex-none w-16 dark:text-white`}>LIGHT</p>
      <div className="flex-1 p-2">{darkMode ? <Line color={'white'} /> : <Line color={'black'} />}</div>
      <p className={`${darkMode && 'font-semibold'} flex-none w-16  dark:text-white`}>DARK</p>
      <div className="absolute cursor-pointer">{darkMode ? <TriangleDark /> : <TriangleLight />}</div>
    </div>
  )
}

export const MiniDarkModeSwitch: React.FC<Props> = ({ darkMode, handleDarkMode }) => {
  return (
    <div className="flex">
      <button onClick={() => handleDarkMode()}>
        <div className={`w-8 h-8 relative rounded-lg text-white`}>
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" stroke="#000000">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </div>
      </button>
    </div>
  )
}
