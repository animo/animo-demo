import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { fadeDelay, fadeExit } from '../../../FramerAnimations'
import { BackButton } from '../../../components/BackButton'
import { Button } from '../../../components/Button'
import { Progress } from '../../../utils/OnboardingUtils'

export interface Props {
  onboardingStep: number
  addOnboardingStep(): void
  removeOnboardingStep(): void
  forwardDisabled: boolean
  backDisabled: boolean
  onboardingCompleted(): void
}

export const OnboardingBottomNav: React.FC<Props> = ({
  onboardingStep,
  addOnboardingStep,
  removeOnboardingStep,
  forwardDisabled,
  backDisabled,
  onboardingCompleted,
}) => {
  const [label, setLabel] = useState('NEXT')
  const isCompleted = onboardingStep === Progress.SETUP_COMPLETED

  useEffect(() => {
    if (isCompleted) {
      setLabel('FINISH')
    } else {
      setLabel('NEXT')
    }
  }, [isCompleted, onboardingStep])

  return (
    <motion.div
      variants={fadeDelay}
      initial="hidden"
      animate="show"
      exit="exit"
      className="flex w-full justify-between mb-4 h-8 self-end select-none"
    >
      <div className="flex self-center">
        <BackButton onClick={removeOnboardingStep} disabled={backDisabled} data-cy="prev-onboarding-step" />
      </div>
      <AnimatePresence exitBeforeEnter>
        <motion.div variants={fadeExit} initial="hidden" animate="show" exit="exit" data-cy="next-onboarding-step">
          <Button
            onClick={isCompleted ? onboardingCompleted : addOnboardingStep}
            text={label}
            disabled={forwardDisabled}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
