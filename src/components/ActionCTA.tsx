import { motion } from 'framer-motion'
import React from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'

import { fade, fadeDelay } from '../FramerAnimations'

interface Props {
  isCompleted: boolean
  onFail(): void
}

export const ActionCTA: React.FC<Props> = ({ isCompleted, onFail }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const renderCTA = !isCompleted ? (
    <motion.div variants={fade} key="openWallet">
      <p>
        Accept the request in your <a href="didcomm://">wallet {isMobile && 'or'}</a>
      </p>
      {isMobile && (
        <a href="didcomm://" className="underline underline-offset-2 mt-2">
          open in wallet
          <FiExternalLink className="inline pb-1" />
        </a>
      )}
    </motion.div>
  ) : (
    <motion.div variants={fade} key="ctaCompleted">
      <p>Success! You can continue.</p>
    </motion.div>
  )

  return (
    <div className="flex flex-col my-4 text-center font-semibold dark:text-white">
      {renderCTA}
      <motion.p variants={fadeDelay} className={`text-sm mt-2  ${!isCompleted ? 'visible' : 'invisible'}`}>
        <u className="m-auto cursor-pointer" onClick={onFail}>
          I didn't receive anything
        </u>
      </motion.p>
    </div>
  )
}
