import type { Entity, RequestedCredential, Step } from '../../../slices/types'
import type { ProofRecord } from '@aries-framework/core'

import { ProofEventTypes } from '@aries-framework/core'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'

import { fade, fadeExit, fadeX } from '../../../FramerAnimations'
import { useWebhookEvent } from '../../../api/Webhook'
import { useAppDispatch } from '../../../hooks/hooks'
import { setProof } from '../../../slices/proof/proofSlice'
import { createProofOOB } from '../../../slices/proof/proofThunks'
import { ProofAttributesCard } from '../components/ProofAttributesCard'
import { StepInfo } from '../components/StepInfo'

const QR = require('qrcode.react')

export interface Props {
  proof?: ProofRecord
  proofUrl?: string
  step: Step
  requestedCredentials: RequestedCredential[]
  entity: Entity
}

export const StepProofOOB: React.FC<Props> = ({ proof, proofUrl, step, requestedCredentials, entity }) => {
  const dispatch = useAppDispatch()
  const proofReceived = proof?.state === 'presentation-received'

  const createProofRequest = () => {
    const proofs: any = []
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
      createProofOOB({
        connectionId: '',
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
      if (event.payload.proofRecord.id === proof?.id) {
        dispatch(setProof(event.payload.proofRecord))
      }
    },
    !proofReceived,
    [proof]
  )

  const deepLink = `didcomm://aries_connection_invitation?${proofUrl?.split('?')[1]}`
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const isLarge = useMediaQuery({ query: '(max-width: 1242px)' })

  const renderCTA = !proofReceived ? (
    <motion.div variants={fade} key="openWallet">
      <p>
        Scan the QR-code with your <a href={deepLink}>wallet {isMobile && 'or'} </a>
      </p>
      {isMobile && (
        <a href={deepLink} className="underline underline-offset-2 mt-2">
          open in wallet
          <FiExternalLink className="inline pb-1" />
        </a>
      )}
    </motion.div>
  ) : (
    <motion.div variants={fade} key="ctaCompleted">
      <p>Success! You can continue.</p>
    </motion.div>
  )

  return (
    <motion.div variants={fadeX} initial="hidden" animate="show" exit="exit" className="flex flex-col h-full">
      <StepInfo title={step.title} description={step.description} />
      <AnimatePresence initial={false} exitBeforeEnter onExitComplete={() => null}>
        {!proofReceived ? (
          <motion.div
            variants={fadeExit}
            key="renderProofQR"
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-row m-auto p-4 bg-animo-white rounded-lg"
          >
            {proofUrl && <QR value={proofUrl} size={isMobile ? 256 : isLarge ? 384 : 448} />}

            {/* <div id="qr-target" /> */}
          </motion.div>
        ) : (
          <motion.div variants={fadeExit} key="renderProofAttributes" className="flex flex-row m-auto w-full">
            <div className="w-full lg:w-2/3 m-auto">
              <ProofAttributesCard
                entity={entity}
                requestedCredentials={requestedCredentials}
                proof={proof}
                proofReceived={proofReceived}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col mt-4 text-center font-semibold">{renderCTA}</div>
    </motion.div>
  )
}
