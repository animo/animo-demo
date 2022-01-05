import type { Colors, Entity, Section, StepperItem } from '../../slices/types'

import { motion } from 'framer-motion'
import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'

import { fadeDelay } from '../../FramerAnimations'

import { ConnectionCard } from './components/ConnectionCard'
import { ProofCard } from './components/ProofCard'
import { StepperCard } from './components/StepperCard'

export interface Props {
  section: Section
  entity: Entity
  colors: Colors
  stepper: StepperItem[]
  stepCount: number
  sectionCount: number
  showLeaveModal(): void
}

export const SideView: React.FC<Props> = ({
  section,
  entity,
  colors,
  stepper,
  stepCount,
  sectionCount,
  showLeaveModal,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 976px)' })

  return (
    <motion.div
      key={'animateSideDiv'}
      variants={{
        hidden: { x: isMobile ? 0 : '-100vh', opacity: isMobile ? 0 : 1 },
        show: {
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.2,
            type: 'spring',
            damping: 10,
            stiffness: 30,
          },
        },
        exit: {
          x: isMobile ? 0 : '-100vh',
          opacity: isMobile ? 1 : 0,
          transition: {
            duration: 0.5,
            when: 'afterChildren',
          },
        },
      }}
      initial="hidden"
      animate="show"
      exit="exit"
      className="flex flex-col lg:mx-6 dark:text-white w-auto lg:w-1/3"
    >
      <ConnectionCard icon={entity.icon} entity={entity.name} />
      {section.requestedCredentials && <ProofCard requestedItems={section.requestedCredentials} />}
      <StepperCard
        steps={stepper}
        sectionCount={sectionCount}
        stepCount={stepCount}
        colorPrimary={colors.primary}
        colorSecondary={colors.secondary}
      />
      <motion.p variants={fadeDelay} className="flex p-0 md:p-4 fixed bottom-5 lg:relative">
        <FiLogOut onClick={showLeaveModal} className="ml-2 inline h-8 cursor-pointer" />
      </motion.p>
    </motion.div>
  )
}
