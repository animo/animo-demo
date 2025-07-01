import type { RequestedCredential, UseCaseCard } from '../../../slices/types'

import { motion } from 'framer-motion'
import React from 'react'

import { rowFadeX } from '../../../FramerAnimations'
import { prependApiUrl } from '../../../utils/Url'

import { StartButton } from './StartButton'

export interface Props {
  slug: string
  card: UseCaseCard
  requiredCredentials: RequestedCredential[]
  isCompleted: boolean
  isLocked: boolean
  start(slug: string): void
}

export const UseCaseItem: React.FC<Props> = ({ slug, card, isCompleted, requiredCredentials, isLocked, start }) => {
  return (
    <motion.div variants={rowFadeX} key={slug}>
      <div
        className={`flex flex-col bg-animo-white dark:bg-animo-black rounded-lg my-2 p-4 lg:p-4 lg:px-8 mt-2 h-auto shadow-sm`}
      >
        <h1 className="flex-none font-bold text-lg mb-2 h-6">{card.title}</h1>
        <div className="flex h-32 mt-2">
          <img className="h-full w-1/2 mr-2 m-auto xl:w-1/5" src={prependApiUrl(card.image)} alt={card.title} />
          <p className="hidden md:block text-xs md:text-sm xl:text-base py-2 px-4 w-2/3 xl:w-2/4">{card.description}</p>
          <div className="w-2/3 xl:w-1/3 flex flex-col">
            <h2 className="text-sm xl:text-base font-semibold mb-2">You'll be asked to share</h2>
            {requiredCredentials.map((item) => {
              return (
                <div key={item.id} className={`flex flex-row mb-2`}>
                  <img className="w-4 h-4 lg:w-6 lg:h-6 mx-2" src={prependApiUrl(item.icon)} alt="credential-icon" />
                  <p className="text-xs sxl:text-sm">{item.name}&nbsp;</p>
                </div>
              )
            })}
            <div className="flex flex-1 items-end justify-end">
              <StartButton onClick={() => start(slug)} text={'START'} disabled={isLocked} isCompleted={isCompleted} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
