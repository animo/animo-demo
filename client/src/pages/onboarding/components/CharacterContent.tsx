import type { Character } from '../../../slices/types'

import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import { characterFade, fadeExit } from '../../../FramerAnimations'
import { prependApiUrl } from '../../../utils/Url'

export interface Props {
  character?: Character
}

export const CharacterContent: React.FC<Props> = ({ character }) => {
  return (
    <motion.div variants={fadeExit} initial="hidden" animate="show" exit="exit" className="h-full">
      {character ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={character.id}
            variants={characterFade}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-col h-full justify-around"
          >
            <div className="p-2 bg-animo-coral dark:bg-animo-blue text-white rounded-l-lg flex px-4 self-end">
              <p>{character.type}</p>
            </div>
            <img className="h-72" src={prependApiUrl(character.image)} />
            <div className="px-4 sxl:px-8 dark:text-white">
              <p className="text-lg font-medium">{character.name}</p>
              <p className="text-grey text-sm lg:text-base ">{character.backstory}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <p className="flex h-full items-center justify-center text-grey">SELECT YOUR CHARACTER</p>
      )}
    </motion.div>
  )
}
