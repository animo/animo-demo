import type { Content } from '../../../utils/OnboardingUtils'

import { motion } from 'framer-motion'
import React from 'react'

import { fadeX } from '../../../FramerAnimations'

export interface Props {
  content: Content
  characterName: string
}

export const SetupCompleted: React.FC<Props> = ({ content, characterName }) => {
  const lastIndex = content.title.lastIndexOf(' ')
  const lastWord = (
    <p className="inline text-animo-coral dark:text-animo-blue">{content.title.substring(lastIndex + 1)}</p>
  )
  const newTitle = content.title.substring(0, lastIndex)

  return (
    <motion.div className="h-full" variants={fadeX} initial="hidden" animate="show" exit="exit">
      <div className="flex flex-col leading-loose">
        <div className="flex-1 my-4">
          <h2 className="text-3xl md:text-4xl font-semibold dark:text-white">
            {newTitle}&nbsp;
            {lastWord}
          </h2>
        </div>
        <div className="pt-4 flex-1 mb-6">
          <p className="dark:text-white">
            {content.text}
            <strong>{characterName}</strong>!
          </p>
        </div>
      </div>
    </motion.div>
  )
}
