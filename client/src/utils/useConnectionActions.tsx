import { useRegisterActions } from 'kbar'
import { useMemo } from 'react'

import { useAppDispatch } from '../hooks/hooks'
import { useConnection } from '../slices/connection/connectionSelectors'
import { setUseLegacyInvitations } from '../slices/connection/connectionSlice'

export default function useConnectionActions() {
  const dispatch = useAppDispatch()

  const { useLegacyInvitations } = useConnection()

  const connectionActions = useMemo(
    () =>
      useLegacyInvitations
        ? [
            {
              id: 'invitation-type-legacy',
              name: `Legacy (RFC 0160) (active)`,
              keywords: 'invitation type legacy',
              perform: () => {
                dispatch(setUseLegacyInvitations(true))
              },
              parent: 'invitation-type',
            },
            {
              id: 'invitation-type-oob',
              name: `Out Of Band ${!useLegacyInvitations && ' (active)'}`,
              keywords: 'invitation type oob',
              perform: () => {
                dispatch(setUseLegacyInvitations(false))
              },
              parent: 'invitation-type',
            },
          ]
        : [
            {
              id: 'invitation-type-legacy',
              name: `Legacy (RFC 0160)`,
              keywords: 'invitation type legacy',
              perform: () => {
                dispatch(setUseLegacyInvitations(true))
              },
              parent: 'invitation-type',
            },
            {
              id: 'invitation-type-oob',
              name: `Out Of Band ${!useLegacyInvitations && ' (active)'}`,
              keywords: 'invitation type oob',
              perform: () => {
                dispatch(setUseLegacyInvitations(false))
              },
              parent: 'invitation-type',
            },
          ],
    [useLegacyInvitations]
  )

  useRegisterActions(connectionActions)
}
