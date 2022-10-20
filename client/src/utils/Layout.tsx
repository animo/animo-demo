import { AnimatePresence, motion } from 'framer-motion'
import { useRegisterActions } from 'kbar'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

import { confettiFade } from '../FramerAnimations'
import { useAppDispatch } from '../hooks/hooks'
import { fetchAllCharacters } from '../slices/characters/charactersThunks'
import { useConnection } from '../slices/connection/connectionSelectors'
import { setUseLegacyInvitations } from '../slices/connection/connectionSlice'
import { useCredentials } from '../slices/credentials/credentialsSelectors'
import { setProtocolVersion } from '../slices/credentials/credentialsSlice'
import { usePreferences } from '../slices/preferences/preferencesSelectors'
import { resetDashboard, setDarkMode } from '../slices/preferences/preferencesSlice'
import { fetchWallets } from '../slices/wallets/walletsThunks'

export const Layout: React.FC = () => {
  const dispatch = useAppDispatch()
  const { demoCompleted } = usePreferences()
  const [confettiPieces, setConfettiPieces] = useState(0)
  const { useLegacyInvitations } = useConnection()
  const { protocolVersion } = useCredentials()

  useEffect(() => {
    if (demoCompleted && location.pathname.includes('dashboard')) {
      setConfettiPieces(200)
      setTimeout(() => {
        setConfettiPieces(0)
      }, 10000)
    }
  }, [demoCompleted])

  const actions = [
    {
      id: 'confetti',
      name: 'Make it rain…',
      shortcut: ['c'],
      keywords: 'confetti',
      perform: () => {
        setConfettiPieces(200)
        setTimeout(() => {
          setConfettiPieces(0)
        }, 1300)
      },
    },
    {
      id: 'resetDemo',
      name: 'Reset demo',
      shortcut: ['r'],
      keywords: 'Reset demo',
      perform: () => {
        dispatch({ type: 'demo/resetDemo' })
        dispatch(fetchWallets())
        dispatch(fetchAllCharacters())
      },
    },
    {
      id: 'resetDashboard',
      name: 'Reset dashboard',
      shortcut: ['d'],
      keywords: 'Reset completed use cases',
      perform: () => {
        dispatch(resetDashboard())
      },
    },
    {
      id: 'resetConfiguration',
      name: 'Reset configuration',
      shortcut: ['c'],
      keywords: 'Reset configuration',
      perform: () => {
        dispatch({ type: 'demo/resetConfiguration' })
      },
    },
    {
      id: 'darkTheme',
      name: 'Dark',
      keywords: 'dark theme',
      perform: () => {
        document.documentElement.classList.add('dark')
        dispatch(setDarkMode(true))
      },
      parent: 'theme',
    },
    {
      id: 'lightTheme',
      name: 'Light',
      keywords: 'light theme',
      perform: () => {
        document.documentElement.classList.remove('dark')
        dispatch(setDarkMode(false))
      },
      parent: 'theme',
    },
  ]

  useRegisterActions(actions)

  const connectionActions = [
    {
      id: 'invitation-type-legacy',
      name: `Legacy (RFC 0160)${useLegacyInvitations ? ' (active)' : ''}`,
      keywords: 'invitation type legacy',
      perform: () => {
        dispatch(setUseLegacyInvitations(true))
      },
      parent: 'invitation-type',
    },
    {
      id: 'invitation-type-oob',
      name: `Out Of Band ${!useLegacyInvitations ? ' (active)' : ''}`,
      keywords: 'invitation type oob',
      perform: () => {
        dispatch(setUseLegacyInvitations(false))
      },
      parent: 'invitation-type',
    },
  ]

  useRegisterActions(connectionActions, [useLegacyInvitations])

  const credentialActions = [
    {
      id: 'issue-credential-protocol-version-1',
      name: `V1 ${protocolVersion === 'v1' ? ' (active)' : ''}`,
      keywords: 'issue credential protocol version 1',
      perform: () => {
        dispatch(setProtocolVersion('v1'))
      },
      parent: 'issue-credential-protocol-version',
    },
    {
      id: 'issue-credential-protocol-version-2',
      name: `V2 ${protocolVersion === 'v2' ? ' (active)' : ''}`,
      keywords: 'issue credential protocol version 2',
      perform: () => {
        dispatch(setProtocolVersion('v2'))
      },
      parent: 'issue-credential-protocol-version',
    },
  ]

  useRegisterActions(credentialActions, [protocolVersion])

  return (
    <div>
      <AnimatePresence>
        {confettiPieces > 0 && (
          <motion.div variants={confettiFade} initial="hidden" animate="show" exit="exit">
            <Confetti
              key="confetti"
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={confettiPieces}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
