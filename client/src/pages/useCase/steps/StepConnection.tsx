import type { ConnectionState } from '../../../slices/connection/connectionSlice'
import type { Entity, Step } from '../../../slices/types'
import type { ConnectionRecord } from '@aries-framework/core'

import { ConnectionEventTypes } from '@aries-framework/core'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'

import { fade, fadeX } from '../../../FramerAnimations'
import { useWebhookEvent } from '../../../api/Webhook'
import { QRCode } from '../../../components/QRCode'
import { useAppDispatch } from '../../../hooks/hooks'
import { useConnection } from '../../../slices/connection/connectionSelectors'
import { fetchConnectionEventById, fetchConnectionEventByOutOfBandId } from '../../../slices/connection/connectionSlice'
import { createInvitation } from '../../../slices/connection/connectionThunks'
import { StepInfo } from '../components/StepInfo'

export interface Props {
  step: Step
  connection: ConnectionState
  entity: Entity
}

export const StepConnection: React.FC<Props> = ({ step, connection, entity }) => {
  const dispatch = useAppDispatch()
  const { id, state, invitationUrl, outOfBandId } = connection
  const isCompleted = state === 'response-sent' || state === 'completed'
  const { useLegacyInvitations } = useConnection()

  useEffect(() => {
    if (!isCompleted) {
      dispatch(createInvitation({ entity, useLegacyInvitations }))
    }
  }, [])

  useWebhookEvent(
    ConnectionEventTypes.ConnectionStateChanged,
    (event: { payload: { connectionRecord: ConnectionRecord } }) => {
      // eslint-disable-next-line no-console
      console.log(`Outside the conditional STCO 1`)
      if (event.payload.connectionRecord.outOfBandId === outOfBandId) {
        // eslint-disable-next-line no-console
        console.log(`Inside the conditional STCO 1`)
        dispatch(fetchConnectionEventByOutOfBandId(event.payload.connectionRecord))
      }
    },
    !id
  )

  useWebhookEvent(
    ConnectionEventTypes.ConnectionStateChanged,
    (event: { payload: { connectionRecord: ConnectionRecord } }) => {
      // eslint-disable-next-line no-console
      console.log(`Outside the conditional STCO 2`)
      if (event.payload.connectionRecord.id === id) {
        // eslint-disable-next-line no-console
        console.log(`Inside the conditional STCO 2`)
        dispatch(fetchConnectionEventById(event.payload.connectionRecord))
      }
    },
    !isCompleted && id ? true : false
  )

  const renderQRCode = invitationUrl && <QRCode invitationUrl={invitationUrl} connectionState={state} />

  const deepLink = `didcomm://aries_connection_invitation?${invitationUrl?.split('?')[1]}`
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const renderCTA = !isCompleted ? (
    <motion.div variants={fade} key="openWallet">
      <p>
        Scan the QR-code with your <a href={deepLink}>wallet {isMobile && 'or'}</a>
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
      {renderQRCode}
      <div className="flex flex-col my-4 text-center font-semibold">{renderCTA}</div>
    </motion.div>
  )
}
