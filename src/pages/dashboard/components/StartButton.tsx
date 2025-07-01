import type { MouseEventHandler } from 'react'

import { motion } from 'framer-motion'
import React from 'react'
import { FiCheck, FiLock } from 'react-icons/fi'

import { buttonHover } from '../../../FramerAnimations'

export interface Props {
  text: string
  disabled: boolean
  isCompleted: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const StartButton: React.FC<Props> = ({ text, onClick, disabled, isCompleted }) => {
  return (
    <div className="has-tooltip">
      <motion.button
        whileHover={buttonHover}
        className={`text-sm bg-animo-black dark:bg-animo-white text-white dark:text-black w-24 h-8 py-1.5 px-4 rounded font-semibold shadow-sm ${
          disabled || isCompleted ? 'opacity-20 cursor-not-allowed' : 'opacity-100'
        }`}
        onClick={onClick ?? undefined}
        disabled={disabled ? true : isCompleted ? true : false}
        data-cy="select-use-case"
      >
        {disabled && (
          <span className="hidden sm:block tooltip rounded shadow-lg p-1 bg-animo-darkgrey text-white w-48 -mt-16">
            You haven't unlocked the required credentials yet.
          </span>
        )}

        {disabled ? (
          <p>
            <FiLock className="m-auto" />
          </p>
        ) : isCompleted ? (
          <p>
            <FiCheck className="m-auto" />
          </p>
        ) : (
          text
        )}
      </motion.button>{' '}
    </div>
  )
}
