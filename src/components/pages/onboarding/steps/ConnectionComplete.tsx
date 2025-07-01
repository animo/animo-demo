import type { Content } from '../../../utils/OnboardingUtils'

import { motion } from 'framer-motion'
import React from 'react'

import { fadeX } from '../../../FramerAnimations'
import { StepInformation } from '../components/StepInformation'

export interface Props {
  content: Content
}

export const ConnectionComplete: React.FC<Props> = ({ content }) => {
  return (
    <motion.div className="h-full" variants={fadeX} initial="hidden" animate="show" exit="exit">
      <StepInformation title={content.title} text={content.text} />
    </motion.div>
  )
}
