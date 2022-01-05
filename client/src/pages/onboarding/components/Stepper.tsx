import type { StepperStep } from '../../../utils/OnboardingSteps'

import { motion } from 'framer-motion'
import React from 'react'

import { topDown } from '../../../FramerAnimations'

import { StepperItem } from './StepperItem'

export interface Props {
  onboardingStep: number
  steps: StepperStep[]
}

export const Stepper: React.FC<Props> = ({ steps, onboardingStep }) => {
  const renderSteps = steps.map((item) => {
    return <StepperItem key={item.name} item={item} onboardingStep={onboardingStep} />
  })

  return (
    <motion.div
      variants={topDown}
      initial="hidden"
      animate="show"
      exit="exit"
      className="mb-4 w-full lg:w-2/3 sxl:w-1/2 select-none"
    >
      <div className="mx-2 p-2 md:mx-4 md:p-4">
        <div className="flex items-center">
          <div className="flex w-8 md:w-16 border-t-4 transition duration-500 ease-in-out border-animo-coral dark:border-animo-blue rounded-l-lg" />
          {renderSteps}
        </div>
      </div>
    </motion.div>
  )
}
