import type { Character } from '../../../slices/types'
import type { Content } from '../../../utils/OnboardingUtils'
import type { CredReqMetadata } from 'indy-sdk'

import { CredentialRecord, JsonTransformer } from '@aries-framework/core'
import { AnimatePresence, motion } from 'framer-motion'
import { track } from 'insights-js'
import React, { useEffect, useState } from 'react'

import { fade, fadeX } from '../../../FramerAnimations'
import { ActionCTA } from '../../../components/ActionCTA'
import { Loader } from '../../../components/Loader'
import { useAppDispatch } from '../../../hooks/hooks'
import { useInterval } from '../../../hooks/useInterval'
import {
  deleteCredentialById,
  fetchCredentialsByConId,
  issueCredential,
} from '../../../slices/credentials/credentialsThunks'
import { FailedRequestModal } from '../components/FailedRequestModal'
import { StarterCredentials } from '../components/StarterCredentials'
import { StepInformation } from '../components/StepInformation'

export interface Props {
  content: Content
  connectionId: string
  credentials: CredentialRecord[]
  currentCharacter: Character
}

export const AcceptCredential: React.FC<Props> = ({ content, connectionId, credentials, currentCharacter }) => {
  const dispatch = useAppDispatch()

  const [isFailedRequestModalOpen, setIsFailedRequestModalOpen] = useState(false)
  const showFailedRequestModal = () => setIsFailedRequestModalOpen(true)
  const closeFailedRequestModal = () => setIsFailedRequestModalOpen(false)

  const credentialsAccepted = Object.values(credentials).every((x) => x.state === 'credential-issued')

  useEffect(() => {
    if (credentials.length === 0) {
      currentCharacter.starterCredentials.forEach((item) => {
        dispatch(issueCredential({ connectionId: connectionId, cred: item }))
        track({
          id: 'credential-issued',
        })
      })
    }
  }, [currentCharacter.starterCredentials, connectionId])

  useInterval(
    () => {
      dispatch(fetchCredentialsByConId(connectionId))
    },
    !credentialsAccepted ? 1000 : null
  )

  const sendNewCredentials = () => {
    credentials.forEach((cred) => {
      if (cred.state !== 'credential-issued') {
        dispatch(deleteCredentialById(cred.id))

        const newCredential = currentCharacter.starterCredentials.find((item) => {
          const credClass = JsonTransformer.fromJSON(cred, CredentialRecord)
          return (
            item.credentialDefinitionId ===
            credClass.metadata.get<CredReqMetadata>('_internal/indyCredential')?.credentialDefinitionId
          )
        })

        if (newCredential) dispatch(issueCredential({ connectionId: connectionId, cred: newCredential }))
      }
    })
    closeFailedRequestModal()
  }

  return (
    <motion.div className="flex flex-col h-full" variants={fadeX} initial="hidden" animate="show" exit="exit">
      <StepInformation title={content.title} text={content.text} />
      <div className="flex flex-row m-auto content-center">
        {currentCharacter.starterCredentials.length === credentials.length ? (
          <AnimatePresence exitBeforeEnter>
            <motion.div className={`flex flex-1 flex-col m-auto`} variants={fade} animate="show" exit="exit">
              <StarterCredentials credentialData={currentCharacter.starterCredentials} credentials={credentials} />
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div className="flex flex-col h-full m-auto">
            <Loader />
          </motion.div>
        )}
        {isFailedRequestModalOpen && (
          <FailedRequestModal key="credentialModal" action={sendNewCredentials} close={closeFailedRequestModal} />
        )}
      </div>
      <ActionCTA isCompleted={credentialsAccepted && credentials.length > 0} onFail={showFailedRequestModal} />
    </motion.div>
  )
}
