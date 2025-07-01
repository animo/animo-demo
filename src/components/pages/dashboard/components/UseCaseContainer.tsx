import type { UseCase } from '@/slices/types'
import type { CredentialExchangeRecord } from '@/types/aries'

import { JsonTransformer } from '@/types/aries'
import { motion } from 'framer-motion'
import React from 'react'
import { useRouter } from 'next/navigation'

import { dashboardSub, dashboardTitle, rowContainer } from '@/FramerAnimations'

import { UseCaseItem } from './UseCaseItem'

export interface Props {
  useCases: UseCase[]
  completedUseCaseSlugs: string[]
}

export const UseCaseContainer: React.FC<Props> = ({ useCases, completedUseCaseSlugs }) => {
  const router = useRouter()

  const startUseCase = (slug: string) => {
    router.push(`/uc/${slug}`)
  }

  const renderUseCases = useCases.map((item) => {
    // Simplified logic for now - we'll implement proper credential checking later
    const isLocked = false // TODO: Implement with Paradym
    const isCompleted = completedUseCaseSlugs.includes(item.slug)

    return (
      <UseCaseItem
        key={item.slug}
        slug={item.slug}
        card={item.card}
        start={startUseCase}
        isLocked={isLocked}
        isCompleted={isCompleted}
      />
    )
  })

  return (
    <div className="flex flex-col mx-4 lg:mx-4 my-2 p-4 md:p-6 lg:p-8 bg-white dark:bg-animo-darkgrey dark:text-white rounded-lg shadow-sm">
      <motion.h1 variants={dashboardTitle} className="text-3xl md:text-4xl font-bold mb-2">
        What's next?
      </motion.h1>
      <motion.p
        variants={dashboardSub}
        className="hidden lg:block font-semibold text-animo-coral mb-4 dark:text-animo-blue"
      >
        Below are the use cases you can explore with your digital credentials.
      </motion.p>
      <motion.div variants={rowContainer} className="flex flex-col w-auto overflow-x-hidden md:overflow-x-visible">
        {renderUseCases}
      </motion.div>
    </div>
  )
}
