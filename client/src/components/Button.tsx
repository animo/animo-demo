import { motion } from 'framer-motion'
import React from 'react'

export interface Props {
  text: string
  disabled?: boolean
  onClick(): void
}

export const Button: React.FC<Props> = ({ text, onClick, disabled }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
      disabled={disabled ?? false}
      className={`bg-black dark:bg-white text-white font-semibold dark:text-animo-black py-1.5 px-4 rounded transition duration-300 ease-in-out transform text-sm shadow-sm ${
        disabled ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:opacity-80'
      }`}
      data-cy="standard-button"
    >
      {text}
    </motion.button>
  )
}
