/* eslint-disable no-console */
import type { Content } from '../../../utils/OnboardingUtils'
import type { ConnectionRecord } from '@aries-framework/core'

import { ConnectionEventTypes } from '@aries-framework/core'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'

import { fade, fadeX } from '../../../FramerAnimations'
import { useWebhookEvent } from '../../../api/Webhook'
import { Loader } from '../../../components/Loader'
import { QRCode } from '../../../components/QRCode'
import { useAppDispatch } from '../../../hooks/hooks'
import { useConnection } from '../../../slices/connection/connectionSelectors'
import { fetchConnectionEventById, fetchConnectionEventByOutOfBandId } from '../../../slices/connection/connectionSlice'
import { createInvitation } from '../../../slices/connection/connectionThunks'
import { setOnboardingConnectionId } from '../../../slices/onboarding/onboardingSlice'
import { setConnectionDate } from '../../../slices/preferences/preferencesSlice'
import { StepInformation } from '../components/StepInformation'

export interface Props {
  content: Content
  outOfBandId?: string
  connectionId?: string
  invitationUrl?: string
  connectionState?: string
}

export const SetupConnection: React.FC<Props> = ({
  content,
  outOfBandId,
  connectionId,
  invitationUrl,
  connectionState,
}) => {
  const dispatch = useAppDispatch()
  const isCompleted = connectionState === 'response-sent' || connectionState === 'completed'
  const { useLegacyInvitations } = useConnection()

  useEffect(() => {
    if (!isCompleted) dispatch(createInvitation({ useLegacyInvitations }))
  }, [])

  useEffect(() => {
    if (connectionId) {
      dispatch(setOnboardingConnectionId(connectionId))
      const date = new Date()
      dispatch(setConnectionDate(date))
    }
  }, [connectionId])

  useWebhookEvent(
    ConnectionEventTypes.ConnectionStateChanged,
    (event: { payload: { connectionRecord: ConnectionRecord } }) => {
      console.log(`Outside the conditional SECO 1`)
      console.log(outOfBandId)
      console.log(event)
      if (event.payload.connectionRecord.outOfBandId === outOfBandId) {
        console.log(`Inside the conditional SECO 1`)
        dispatch(fetchConnectionEventByOutOfBandId(event.payload.connectionRecord))
      }
    },
    !connectionId
  )

  useWebhookEvent(
    ConnectionEventTypes.ConnectionStateChanged,
    (event: { payload: { connectionRecord: ConnectionRecord } }) => {
      // eslint-disable-next-line no-console
      console.log(`Outside the conditional SECO 2`)
      if (event.payload.connectionRecord.id === connectionId) {
        // eslint-disable-next-line no-console
        console.log(`Inside the conditional SECO 2`)
        dispatch(fetchConnectionEventById(event.payload.connectionRecord))
      }
    },
    !isCompleted && connectionId ? true : false
  )

  const renderQRCode = invitationUrl ? (
    <QRCode invitationUrl={invitationUrl} connectionState={connectionState} />
  ) : (
    <div className="m-auto">
      <Loader />
    </div>
  )

  const deepLink = `didcomm://aries_connection_invitation?${invitationUrl?.split('?')[1]}`
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const renderCTA = !isCompleted ? (
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
    <motion.div
      className="flex flex-col h-full  dark:text-white"
      variants={fadeX}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <StepInformation title={content.title} text={content.text} />
      {renderQRCode}
      <div className="flex flex-col mt-4 text-center text-sm md:text-base font-semibold">{renderCTA}</div>
    </motion.div>
  )
}
