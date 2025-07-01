import React from 'react'
import { useNavigate } from 'react-router-dom'

import { SmallButtonText } from '../components/SmallButtonText'

export const PageNotFound: React.FC = () => {
  const navigate = useNavigate()

  const returnToHome = () => {
    navigate('/')
  }
  return (
    <div className="flex h-screen">
      <div className="m-auto flex flex-col">
        <p className="text-6xl py-1.5 px-4">404</p>
        <SmallButtonText text="Return to home" disabled={false} onClick={returnToHome} />
      </div>
    </div>
  )
}
