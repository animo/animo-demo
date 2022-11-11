import type { Attribute, CredentialData, Step } from '../../../slices/types'
import type { ProofRecord } from '@aries-framework/core'
import type { CredReqMetadata } from 'indy-sdk'

import { CredentialEventTypes, JsonTransformer, CredentialExchangeRecord } from '@aries-framework/core'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { fade, fadeX } from '../../../FramerAnimations'
import { useWebhookEvent } from '../../../api/Webhook'
import { ActionCTA } from '../../../components/ActionCTA'
import { useAppDispatch } from '../../../hooks/hooks'
import { fetchCredentialEventByConnectionId } from '../../../slices/credentials/credentialsSlice'
import { deleteCredentialById, issueCredential } from '../../../slices/credentials/credentialsThunks'
import { trackEvent } from '../../../utils/Analytics'
import { getAttributesFromProof } from '../../../utils/ProofUtils'
import { Credential } from '../../onboarding/components/Credential'
import { CredentialSkeleton } from '../../onboarding/components/CredentialSkeleton'
import { FailedRequestModal } from '../../onboarding/components/FailedRequestModal'
import { StepInfo } from '../components/StepInfo'

export interface Props {
  step: Step
  connectionId: string
  issueCredentials: CredentialData[]
  credentials: CredentialExchangeRecord[]
  proof: ProofRecord | undefined
}

export const StepCredential: React.FC<Props> = ({ step, connectionId, issueCredentials, credentials, proof }) => {
  const dispatch = useAppDispatch()

  const [isFailedRequestModalOpen, setIsFailedRequestModalOpen] = useState(false)
  const showFailedRequestModal = () => setIsFailedRequestModalOpen(true)
  const closeFailedRequestModal = () => setIsFailedRequestModalOpen(false)

  const credentialsAccepted = Object.values(credentials).every(
    (x) => x.state === 'credential-issued' || x.state === 'done'
  )
  const [issuedCredData, setIssuedCredData] = useState<CredentialData[]>([])

  const issueCreds = () => {
    // get attributes from proof
    let attributes: Attribute[] = []
    if (step.useProof && proof) {
      attributes = getAttributesFromProof(proof)
    }

    // create new object with attributes
    const credentialData = issueCredentials.map((credential: CredentialData) => ({
      ...credential,
      attributes: credential.attributes ? attributes.concat(credential.attributes) : attributes,
    }))

    // save data for when issue fails
    setIssuedCredData(credentialData)

    // issue credentials
    credentialData.forEach((item) => {
      dispatch(issueCredential({ connectionId: connectionId, cred: item }))
      trackEvent('credential-issued')
    })
  }

  useEffect(() => {
    if (credentials.length === 0) issueCreds()
  }, [])

  useWebhookEvent(
    CredentialEventTypes.CredentialStateChanged,
    (event: { payload: { credentialRecord: CredentialExchangeRecord } }) => {
      if (event.payload.credentialRecord.connectionId === connectionId) {
        dispatch(fetchCredentialEventByConnectionId(event.payload.credentialRecord))
      }
    },
    !credentialsAccepted,
    [connectionId]
  )

  const sendNewCredentials = () => {
    credentials.forEach((cred) => {
      if (cred.state !== 'credential-issued' && cred.state !== 'done') {
        dispatch(deleteCredentialById(cred.id))

        const newCredential = issuedCredData.find((item) => {
          const credClass = JsonTransformer.fromJSON(cred, CredentialExchangeRecord)
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

  const renderCredentials = credentials
    .slice()
    .map((cred, idx) => {
      const data = issueCredentials.find((item) => {
        const credClass = JsonTransformer.fromJSON(cred, CredentialExchangeRecord)
        return (
          item.credentialDefinitionId ===
          credClass.metadata.get<CredReqMetadata>('_internal/indyCredential')?.credentialDefinitionId
        )
      })
      if (data) return <Credential key={cred.id} title={`Credential ${idx + 1}`} credential={cred} data={data} />
    })
    .sort((a, b) => a?.props.data.id.localeCompare(b?.props.data.id))

  return (
    <motion.div variants={fadeX} initial="hidden" animate="show" exit="exit" className="flex flex-col h-full">
      <StepInfo title={step.title} description={step.description} />
      <div className="flex flex-1-1 m-auto">
        <motion.div className={`flex flex-1-1 flex-col m-auto`} variants={fade} animate="show" exit="exit">
          {credentials.length <= (issueCredentials?.length ?? 0) ? (
            <AnimatePresence exitBeforeEnter>{renderCredentials}</AnimatePresence>
          ) : (
            <motion.div className="flex flex-col h-full m-auto">
              <CredentialSkeleton />
            </motion.div>
          )}
        </motion.div>
      </div>
      <ActionCTA isCompleted={credentialsAccepted} onFail={showFailedRequestModal} />
      {isFailedRequestModalOpen && (
        <FailedRequestModal key="credentialModal" action={sendNewCredentials} close={closeFailedRequestModal} />
      )}
    </motion.div>
  )
}
