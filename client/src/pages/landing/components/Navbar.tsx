import React from 'react'

import { DarkModeContainer } from '../../../components/DarkModeContainer'
import { Logo } from '../../../components/Logo'

export const NavBar: React.FC = () => {
  return (
    <div className="flex flex-row select-none my-8 md:pt-4 sm:my-4">
      <div className="flex-1" />
      {/* <DarkModeContainer /> */}
    </div>
  )
}
