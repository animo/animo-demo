import type { ConnectionState } from '../../../slices/connection/connectionSlice'
import type { Entity, Step } from '../../../slices/types'

import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'

import { fade, fadeX } from '../../../FramerAnimations'
import { QRCode } from '../../../components/QRCode'
import { useAppDispatch } from '../../../hooks/hooks'
import { useInterval } from '../../../hooks/useInterval'
import { useConfiguration } from '../../../slices/configuration/configurationSelectors'
import {
  createInvitation,
  fetchConnectionById,
  fetchConnectionByOutOfBandId,
} from '../../../slices/connection/connectionThunks'
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
  const { invitationMethod } = useConfiguration()

  useEffect(() => {
    entity.invitationMethod = invitationMethod ? true : false

    if (!isCompleted) {
      dispatch(createInvitation(entity))
    }
  }, [])

  useInterval(
    () => {
      if (outOfBandId && document.visibilityState === 'visible') {
        dispatch(fetchConnectionByOutOfBandId(outOfBandId))
      }
    },
    !id ? 1000 : null
  )

  useInterval(
    () => {
      if (id && document.visibilityState === 'visible') dispatch(fetchConnectionById(id))
    },
    !isCompleted && id ? 1000 : null
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
