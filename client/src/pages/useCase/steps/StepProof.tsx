import type { Entity, RequestedCredential, Step } from '../../../slices/types'
import type { ProofRecord } from '@aries-framework/core'

import { ProofEventTypes } from '@aries-framework/core'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { fadeX } from '../../../FramerAnimations'
import { useWebhookEvent } from '../../../api/Webhook'
import { ActionCTA } from '../../../components/ActionCTA'
import { useAppDispatch } from '../../../hooks/hooks'
import { fetchProofEventById } from '../../../slices/proof/proofSlice'
import { createProof, deleteProofById } from '../../../slices/proof/proofThunks'
import { FailedRequestModal } from '../../onboarding/components/FailedRequestModal'
import { ProofAttributesCard } from '../components/ProofAttributesCard'
import { StepInfo } from '../components/StepInfo'

export interface Props {
  proof?: ProofRecord
  step: Step
  connectionId: string
  requestedCredentials: RequestedCredential[]
  entity: Entity
}

export const StepProof: React.FC<Props> = ({ proof, step, connectionId, requestedCredentials, entity }) => {
  const dispatch = useAppDispatch()
  const proofReceived = proof?.state === 'presentation-received'

  const [isFailedRequestModalOpen, setIsFailedRequestModalOpen] = useState(false)
  const showFailedRequestModal = () => setIsFailedRequestModalOpen(true)
  const closeFailedRequestModal = () => setIsFailedRequestModalOpen(false)

  const createProofRequest = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const proofs: any = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const predicates: any = []

    requestedCredentials?.forEach((item) => {
      if (item.properties) {
        proofs[item.name] = {
          restrictions: [
            {
              credentialDefinitionId: item.credentialDefinitionId,
            },
          ],
          names: item.properties,
        }
      }
      if (item.predicates) {
        predicates[item.name] = {
          restrictions: [
            {
              credentialDefinitionId: item.credentialDefinitionId,
            },
          ],
          name: item.predicates?.name,
          predicateValue: item.predicates?.value,
          predicateType: item.predicates?.type,
        }
      }
    })

    dispatch(
      createProof({
        connectionId: connectionId,
        attributes: proofs,
        predicates: predicates,
        requestOptions: step.requestOptions,
      })
    )
  }

  useEffect(() => {
    if (!proof) createProofRequest()
  }, [])

  useWebhookEvent(
    ProofEventTypes.ProofStateChanged,
    (event: { payload: { proofRecord: ProofRecord } }) => {
      // eslint-disable-next-line no-console
      console.log(`Outside the conditional STPR 1`)
      if (event.payload.proofRecord.id === proof?.id) {
        // eslint-disable-next-line no-console
        console.log(`Inside the conditional STPR 1`)
        dispatch(fetchProofEventById(event.payload.proofRecord))
      }
    },
    !proofReceived
  )

  const sendNewRequest = () => {
    if (!proofReceived && proof) {
      dispatch(deleteProofById(proof?.id))
      createProofRequest()
    }
    closeFailedRequestModal()
  }

  return (
    <motion.div variants={fadeX} initial="hidden" animate="show" exit="exit" className="flex flex-col h-full">
      <StepInfo title={step.title} description={step.description} />
      <div className="flex flex-row m-auto w-full">
        <div className="w-full lg:w-5/6 sxl:w-2/3 m-auto">
          {proof && (
            <ProofAttributesCard
              entity={entity}
              requestedCredentials={requestedCredentials}
              proof={proof}
              proofReceived={proofReceived}
            />
          )}
        </div>
      </div>
      <ActionCTA isCompleted={proofReceived} onFail={showFailedRequestModal} />
      {isFailedRequestModalOpen && (
        <FailedRequestModal key="credentialModal" action={sendNewRequest} close={closeFailedRequestModal} />
      )}
    </motion.div>
  )
}
