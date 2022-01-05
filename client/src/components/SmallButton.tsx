import type { MouseEventHandler } from 'react'

import { motion } from 'framer-motion'
import React from 'react'

import { buttonHover } from '../FramerAnimations'

export interface Props {
  text: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const SmallButton: React.FC<Props> = ({ text, onClick, disabled }) => {
  return (
    <motion.button
      whileHover={buttonHover}
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
      disabled={disabled ?? false}
      className={`text-sm bg-black dark:bg-white text-white font-semibold dark:text-animo-black py-1.5 px-6 rounded transition duration-300 ease-in-out transform shadow-sm ${
        disabled ? 'bg-opacity-20 dark:bg-opacity-60 cursor-not-allowed' : 'opacity-100 hover:opacity-80'
      }`}
      data-cy="small-button"
    >
      {text}
    </motion.button>
  )
}
