import type { CredentialExchangeRecord } from '@aries-framework/core'
import type { SerializedError } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

import {
  fetchCredentialsByConId,
  fetchCredentialById,
  issueCredential,
  deleteCredentialById,
} from './credentialsThunks'

interface CredentialState {
  credentials: CredentialExchangeRecord[]
  issuedCredentials: CredentialExchangeRecord[]
  isLoading: boolean
  isIssueCredentialLoading: boolean
  protocolVersion: 'v1' | 'v2'
  error: SerializedError | undefined
}

const initialState: CredentialState = {
  credentials: [],
  issuedCredentials: [],
  isLoading: true,
  isIssueCredentialLoading: true,
  protocolVersion: 'v1',
  error: undefined,
}

const credentialSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    clearCredentials: (state) => {
      state.credentials.map(
        (x) => (x.state === 'credential-issued' || x.state === 'done') && state.issuedCredentials.push(x)
      )
      state.credentials = []
    },
    setProtocolVersion: (state, action) => {
      state.protocolVersion = action.payload
    },
    fetchCredentialEventByConnectionId: (state, action) => {
      // eslint-disable-next-line no-console
      console.log(`Credential reducer triggered`, state, action)

      const existingCredentialIndex = state.credentials.findIndex((credential) => credential.id === action.payload.id)

      if (existingCredentialIndex) {
        state.credentials[existingCredentialIndex] = action.payload
      } else {
        state.credentials.push(action.payload)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCredentialsByConId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCredentialsByConId.fulfilled, (state, action) => {
        state.isLoading = false
        state.credentials = action.payload
      })
      .addCase(issueCredential.rejected, (state, action) => {
        state.isIssueCredentialLoading = false
        state.error = action.error
      })
      .addCase(issueCredential.pending, (state) => {
        state.isIssueCredentialLoading = true
      })
      .addCase(issueCredential.fulfilled, (state, action) => {
        state.isIssueCredentialLoading = false
        state.credentials.push(action.payload)
      })
      .addCase(fetchCredentialById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCredentialById.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.credentials.findIndex((cred) => cred.id == action.payload.id)

        if (index == -1) {
          state.credentials.push(action.payload)
          return state
        }

        state.credentials[index] = action.payload
        return state
      })
      .addCase(deleteCredentialById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCredentialById.fulfilled, (state, action) => {
        state.isLoading = false
        state.credentials.filter((cred) => cred.id !== action.payload)
        return state
      })
      .addCase('clearUseCase', (state) => {
        state.credentials.map(
          (x) => (x.state === 'credential-issued' || x.state === 'done') && state.issuedCredentials.push(x)
        )
        state.credentials = []
        state.isLoading = false
      })
      .addCase('demo/resetDemo', (state) => {
        return {
          ...initialState,
          protocolVersion: state.protocolVersion,
        }
      })
      .addCase('demo/resetConfiguration', (state) => {
        state.protocolVersion = initialState.protocolVersion
      })
  },
})

export const { clearCredentials, setProtocolVersion, fetchCredentialEventByConnectionId } = credentialSlice.actions

export default credentialSlice.reducer
