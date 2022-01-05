import type { Step } from '../../../slices/types'

import { motion } from 'framer-motion'
import React from 'react'

import { fadeX } from '../../../FramerAnimations'
import { prependApiUrl } from '../../../utils/Url'
import { StepInfo } from '../components/StepInfo'

export interface Props {
  step: Step
}

export const StepInformation: React.FC<Props> = ({ step }) => {
  return (
    <motion.div variants={fadeX} initial="hidden" animate="show" exit="exit" className="flex flex-col h-full">
      <StepInfo title={step.title} description={step.description} />
      <div className="flex m-auto">
        <img className="object-contain m-auto w-5/6" src={step.image && prependApiUrl(step.image)} alt={step.title} />
      </div>
    </motion.div>
  )
}
