import type { Character } from '../../../slices/types'
import type { Content } from '../../../utils/OnboardingUtils'

import { motion } from 'framer-motion'
import React from 'react'

import { fadeX } from '../../../FramerAnimations'
import { useAppDispatch } from '../../../hooks/hooks'
import { useDarkMode } from '../../../hooks/useDarkMode'
import { setCharacter } from '../../../slices/characters/charactersSlice'
import { trackEvent } from '../../../utils/Analytics'
import { prependApiUrl } from '../../../utils/Url'
import { StepInformation } from '../components/StepInformation'

export interface Props {
  content: Content
  currentCharacter?: Character
  characters: Character[]
}

export const PickCharacter: React.FC<Props> = ({ content, currentCharacter, characters }) => {
  const dispatch = useAppDispatch()
  const darkMode = useDarkMode()

  const CharacterClickHandler = (char: Character) => {
    dispatch(setCharacter(char))
    trackEvent('character-selected', {
      props: {
        character: char.name,
      },
    })
  }

  const renderCharacters = characters.map((char: Character) => {
    const cardStyleSelected = `shadow-xl ring-4 ${darkMode ? 'ring-animo-blue' : 'ring-animo-coral'}`
    const cardStyleUnselected = `ring-4 ${darkMode ? 'ring-animo-black' : 'ring-animo-white'}`

    return (
      <motion.div
        key={char.id}
        onClick={() => CharacterClickHandler(char)}
        whileHover={{ scale: 1.01 }}
        className="flex md:flex-row lg:flex-col"
        data-cy="select-char"
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          className={`m-auto h-16 w-16 p-2 sm:h-20 sm:w-20 md:h-24 md:w-24 md:p-4 lg:h-36 lg:w-36 lg:p-8 rounded-full bg-animo-white dark:bg-animo-black my-6 shadow ${
            currentCharacter?.id === char.id ? cardStyleSelected : cardStyleUnselected
          }`}
          src={prependApiUrl(char.starterCredentials.find((x) => x.name.includes('CRA'))?.icon ?? '')}
          alt={char.name}
        />
        <div className="m-auto p-4 flex flex-1 flex-col text-left lg:text-center dark:text-white">
          <h2 className="font-bold">{char.name}</h2>
          <p>{char.type}</p>
        </div>
      </motion.div>
    )
  })

  return (
    <motion.div variants={fadeX} initial="hidden" animate="show" exit="exit">
      <StepInformation title={content.title} text={content.text} />
      <div className="flex flex-col lg:flex-row items-left lg:items-start justify-between px-8 h-full max-h-72 sm:max-h-96 overflow-y-scroll lg:overflow-y-hidden">
        {renderCharacters}
      </div>
    </motion.div>
  )
}
