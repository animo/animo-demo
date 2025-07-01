import type { MouseEventHandler } from 'react'

import { motion } from 'framer-motion'
import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'

export interface Props {
  disabled?: boolean
  onClick: MouseEventHandler<HTMLImageElement>
}

export const BackButton: React.FC<Props> = ({ onClick, disabled }) => {
  return (
    <motion.div
      whileHover={{ opacity: 0.8 }}
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
      className={`cursor-pointer dark:text-white ${disabled ? 'invisible' : ''}`}
    >
      <p className="inline text-sm">
        <u></u>
        <FiArrowLeft className="inline h-4 w-6 mb-1" />
        BACK
      </p>
    </motion.div>
  )
}
