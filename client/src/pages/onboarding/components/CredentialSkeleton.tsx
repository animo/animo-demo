import { motion } from 'framer-motion'
import React from 'react'

import { fadeX } from '../../../FramerAnimations'
import { StateIndicator } from '../../../components/StateIndicator'

export const CredentialSkeleton: React.FC = () => {
  return (
    <motion.div
      variants={fadeX}
      animate="show"
      exit="exit"
      className="flex flex-col bg-animo-white dark:bg-animo-black m-4 px-4 py-2 w-72 md:w-96 h-28 rounded-lg shadow"
    >
      <div className="flex-1-1 title">
        <h1 className="font-semibold dark:text-white">Credential</h1>
        <hr className="text-animo-lightgrey" />
      </div>
      <div className="flex-1 flex flex-row items-center justify-between">
        <div className="bg-animo-lightgrey rounded-lg p-2 w-12">
          <img className="h-8 m-auto" />
        </div>
        <div className="flex-1 px-4 justify-self-start dark:text-white">
          <p>Credential</p>
        </div>
        <StateIndicator completed={false} />
      </div>
    </motion.div>
  )
}
