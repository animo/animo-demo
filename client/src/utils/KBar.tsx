import type { ActionImpl } from 'kbar'

import { AnimatePresence, motion } from 'framer-motion'
import { KBarProvider, KBarPortal, KBarPositioner, KBarAnimator, KBarSearch } from 'kbar'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

import { confettiFade } from '../FramerAnimations'
import { useAppDispatch } from '../hooks/hooks'
import { fetchAllCharacters } from '../slices/characters/charactersThunks'
import { setUseLegacyInvitations } from '../slices/configuration/configurationSlice'
import { setProtocolVersion } from '../slices/credentials/credentialsSlice'
import { usePreferences } from '../slices/preferences/preferencesSelectors'
import { resetDashboard, setDarkMode } from '../slices/preferences/preferencesSlice'
import { fetchWallets } from '../slices/wallets/walletsThunks'

import { RenderResults } from './RenderResults'

type PropsWithChildren = {
  children: JSX.Element
}

export const KBar: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch()
  const { demoCompleted } = usePreferences()
  const [confettiPieces, setConfettiPieces] = useState(0)

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
      id: 'resetDashboard',
      name: 'Reset dashboard',
      shortcut: ['d'],
      keywords: 'Reset completed use cases',
      perform: () => {
        dispatch(resetDashboard())
      },
    },
    {
      id: 'resetDemo',
      name: 'Reset demo',
      shortcut: ['r'],
      keywords: 'Reset demo',
      perform: () => {
        dispatch({ type: 'demo/RESET' })
        dispatch(fetchWallets())
        dispatch(fetchAllCharacters())
      },
    },
    {
      id: 'configuration',
      name: 'Choose demo configuration options...',
      shortcut: ['o'],
      keywords: 'configuration',
      section: 'Configuration',
    },
    {
      id: 'ledger',
      name: 'Select ledger',
      keywords: 'ledger',
      section: '',
      parent: 'configuration',
    },
    {
      id: 'bcovrin',
      name: 'BCovrin Test',
      keywords: 'bcovrin',
      section: '',
      perform: () => {
        alert('BCovrin Test ledger selected!')
      },
      parent: 'ledger',
    },
    {
      id: 'issue-credential-protocol-version',
      name: 'Select credential protocol version',
      keywords: 'issue credential protocol version',
      section: '',
      parent: 'configuration',
    },
    {
      id: 'issue-credential-protocol-version-1',
      name: 'V1',
      keywords: 'issue credential protocol version 1',
      section: '',
      perform: () => {
        dispatch(setProtocolVersion('v1'))
      },
      parent: 'issue-credential-protocol-version',
    },
    {
      id: 'issue-credential-protocol-version-2',
      name: 'V2',
      keywords: 'issue credential protocol version 2',
      section: '',
      perform: () => {
        dispatch(setProtocolVersion('v2'))
      },
      parent: 'issue-credential-protocol-version',
    },
    {
      id: 'present-proof-protocol-version',
      name: 'Select proof protocol version',
      keywords: 'present proof protocol version',
      section: '',
      parent: 'configuration',
    },
    {
      id: 'present-proof-protocol-version-1',
      name: 'v1',
      keywords: 'present proof protocol version 1',
      section: '',
      perform: () => {
        alert('Proof Protocol Version 1 selected')
      },
      parent: 'present-proof-protocol-version',
    },
    {
      id: 'present-proof-protocol-version-2',
      name: 'v2',
      keywords: 'present proof protocol version 2',
      section: '',
      perform: () => {
        alert('Proof Protocol Version 2 selected')
      },
      parent: 'present-proof-protocol-version',
    },
    {
      id: 'invitation-type',
      name: 'Change connection invitation type',
      keywords: 'invitation type',
      section: '',
      parent: 'configuration',
    },
    {
      id: 'invitation-type-oob',
      name: 'Out Of Band',
      keywords: 'invitation type oob',
      section: '',
      perform: () => {
        dispatch(setUseLegacyInvitations(false))
      },
      parent: 'invitation-type',
    },
    {
      id: 'invitation-type-legacy',
      name: 'Legacy (RFC 0160)',
      keywords: 'invitation type legacy',
      section: '',
      perform: (action: ActionImpl) => {
        dispatch(setUseLegacyInvitations(true))
      },
      isActive: true,
      parent: 'invitation-type',
    },
    {
      id: 'theme',
      name: 'Change theme…',
      shortcut: ['t'],
      keywords: 'interface color dark light',
      section: 'Preferences',
    },
    {
      id: 'darkTheme',
      name: 'Dark',
      keywords: 'dark theme',
      section: '',
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
      section: '',
      perform: () => {
        document.documentElement.classList.remove('dark')
        dispatch(setDarkMode(false))
      },
      parent: 'theme',
    },
  ]

  const searchStyle = {
    padding: '12px 16px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box' as React.CSSProperties['boxSizing'],
    outline: 'none',
    border: 'none',
    background: '#FFFFF',
    color: 'var(--foreground)',
  }

  const animatorStyle = {
    maxWidth: '500px',
    width: '100%',
    background: '#FFFFF',
    color: 'var(--foreground)',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  }

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
      <KBarProvider actions={actions} options={{ enableHistory: true, disableScrollbarManagement: true }}>
        <KBarPortal>
          <KBarPositioner>
            <KBarAnimator style={animatorStyle}>
              <KBarSearch style={searchStyle} placeholder="I see you found the secret menu…" />
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
      </KBarProvider>
      {children}
    </div>
  )
}
