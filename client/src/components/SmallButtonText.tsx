import type { MouseEventHandler } from 'react'

import { motion } from 'framer-motion'
import React from 'react'

import { buttonHover } from '../FramerAnimations'

export interface Props {
  text: string
  disabled?: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const SmallButtonText: React.FC<Props> = ({ text, onClick, disabled }) => {
  return (
    <motion.button
      whileHover={buttonHover}
      className="text-sm dark:text-animo-white text-animo-black py-1.5 px-4 rounded font-semibold"
      onClick={onClick}
      disabled={disabled ?? false}
      data-cy="small-button-text"
    >
      {text}
    </motion.button>
  )
}
