'use client'

import React from 'react'
import Image from 'next/image'

import animoDark from '../../../assets/dark/animo-logo-dark.png'
import animoLight from '../../../assets/light/animo-logo-light.png'
import { useDarkMode } from '../../../hooks/useDarkMode'

export const Footer: React.FC = () => {
  const darkMode = useDarkMode()

  return (
    <div className="flex dark:text-white justify-center content-center select-none my-8 pb-4 sm:my-4">
      <p className="self-center mr-2 text-sm">POWERED BY</p>
      <a href="https://animo.id" target="_blank" rel="noopener noreferrer">
        <Image 
          className="m-2 h-3 w-auto" 
          src={darkMode ? animoDark : animoLight} 
          alt="animo-credentials-home" 
          height={12}
        />
      </a>
    </div>
  )
}
