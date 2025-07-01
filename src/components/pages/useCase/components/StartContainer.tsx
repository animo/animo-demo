import type { CredentialData, Entity, RequestedCredential, Step } from '../../../slices/types'

import { motion } from 'framer-motion'
import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

import { fadeExit } from '../../../FramerAnimations'
import { SmallButton } from '../../../components/SmallButton'
import { useAppDispatch } from '../../../hooks/hooks'
import { nextStep } from '../../../slices/useCases/useCasesSlice'
import { prependApiUrl } from '../../../utils/Url'

import { StarterInfo } from './StarterInfo'

export interface Props {
  step: Step
  entity: Entity
  requestedCredentials?: RequestedCredential[]
  issueCredentials?: CredentialData[]
}

export const StartContainer: React.FC<Props> = ({ entity, requestedCredentials, issueCredentials, step }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ query: '(max-width: 976px)' })
  const style = isMobile ? { minHeight: '85vh' } : { maxHeight: '940px' }

  const leave = () => {
    navigate('/dashboard')
  }

  const next = () => {
    dispatch(nextStep())
  }
  return (
    <motion.div
      variants={fadeExit}
      initial="hidden"
      animate="show"
      exit="exit"
      className="flex flex-row bg-white dark:bg-animo-darkgrey rounded-lg p-2 h-max min-h-full my-8 shadow-sm"
      style={style}
      data-cy="start-container"
    >
      <div className="flex flex-col p-6 md:p-12 md:pb-6 xl:p-16 xl:pb-8 w-full lg:w-2/3 ">
        <StarterInfo
          title={step.title}
          description={step.description ?? ''}
          entity={entity}
          requestedCredentials={requestedCredentials}
          issueCredentials={issueCredentials}
        />

        <div className="flex justify-between content-center bg-animogrey dark:bg-animo-darkgrey ">
          <FiLogOut onClick={leave} className="ml-2 inline h-8 cursor-pointer" />
          <SmallButton onClick={next} text={'START'} disabled={false} />
        </div>
      </div>
      <div className="bg-animo-white dark:bg-animo-black hidden lg:flex lg:w-1/3 rounded-r-lg flex content-center p-4 select-none">
        {step.image && <img className="p-8" src={prependApiUrl(step.image)} alt={step.title} />}
      </div>
    </motion.div>
  )
}
