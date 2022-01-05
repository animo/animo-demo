import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { page } from '../../FramerAnimations'
import { useAppDispatch } from '../../hooks/hooks'
import { useTitle } from '../../hooks/useTitle'
import { useCharacters } from '../../slices/characters/charactersSelectors'
import { fetchAllCharacters } from '../../slices/characters/charactersThunks'
import { useConnection } from '../../slices/connection/connectionSelectors'
import { useCredentials } from '../../slices/credentials/credentialsSelectors'
import { useOnboarding } from '../../slices/onboarding/onboardingSelectors'
import { completeOnboarding } from '../../slices/onboarding/onboardingSlice'
import { fetchWallets } from '../../slices/wallets/walletsThunks'
import { Progress, StepperItems } from '../../utils/OnboardingUtils'

import { OnboardingContainer } from './OnboardingContainer'
import { Stepper } from './components/Stepper'

export const OnboardingPage: React.FC = () => {
  useTitle('Get Started | Animo Self-Sovereign Identity Demo')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { characters, currentCharacter } = useCharacters()

  const { onboardingStep, isCompleted } = useOnboarding()
  const { id, state, invitationUrl } = useConnection()
  const { credentials } = useCredentials()

  useEffect(() => {
    dispatch(fetchWallets())
    dispatch(fetchAllCharacters())
    if (onboardingStep === Progress.SETUP_COMPLETED || isCompleted) {
      dispatch(completeOnboarding())
      navigate('/dashboard')
    }

    // if user reloads on credential page, set back
    if (onboardingStep === Progress.ACCEPT_CREDENTIAL) {
      dispatch({ type: 'demo/RESET' })
    }
  }, [dispatch])

  return (
    <motion.div
      variants={page}
      initial="hidden"
      animate="show"
      exit="exit"
      className="container flex flex-col items-center p-4"
    >
      <Stepper steps={StepperItems} onboardingStep={onboardingStep} />
      <AnimatePresence exitBeforeEnter>
        <OnboardingContainer
          characters={characters}
          currentCharacter={currentCharacter}
          onboardingStep={onboardingStep}
          connectionId={id}
          connectionState={state}
          invitationUrl={invitationUrl}
          credentials={credentials}
        />
      </AnimatePresence>
    </motion.div>
  )
}
