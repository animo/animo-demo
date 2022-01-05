import type { ReactChild, ReactFragment, ReactPortal } from 'react'

import { createContext } from 'react'

import { useOnboarding } from '../slices/onboarding/onboardingSelectors'

export const AuthContext = createContext({ auth: false })

export const AuthProvider = (props: {
  children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined
}) => {
  const { isCompleted } = useOnboarding()

  return <AuthContext.Provider value={{ auth: isCompleted }}>{props.children}</AuthContext.Provider>
}
