'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import animoDark from '../assets/dark/animo-logo-dark.png'
import animoLight from '../assets/light/animo-logo-light.png'
import { useDarkMode } from '../hooks/useDarkMode'

export const Logo: React.FC = () => {
  const darkMode = useDarkMode()

  return (
    <div className="flex-1-1 m-auto">
      <Link href="/">
        <Image 
          className="h-6 sxl:h-8 w-auto" 
          src={darkMode ? animoDark : animoLight} 
          alt="animo-logo" 
          height={32}
          priority
        />
      </Link>
    </div>
  )
}
