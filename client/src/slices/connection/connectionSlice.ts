import { createSlice } from '@reduxjs/toolkit'

import { createInvitation, fetchConnectionById, fetchConnectionByOutOfBandId } from './connectionThunks'

export interface ConnectionState {
  id?: string
  state?: string
  invitationUrl?: string
  outOfBandId?: string
  isLoading: boolean
  useLegacyInvitations: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connectionEvent: any | undefined
}

const initialState: ConnectionState = {
  id: undefined,
  state: undefined,
  invitationUrl: undefined,
  outOfBandId: undefined,
  isLoading: false,
  useLegacyInvitations: true,
  connectionEvent: undefined,
}

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    clearConnection: (state) => {
      state.id = undefined
      state.state = undefined
      state.invitationUrl = undefined
      state.isLoading = false
    },
    setUseLegacyInvitations: (state, action) => {
      state.useLegacyInvitations = action.payload
    },
    setConnectionEvent: (state, action) => {
      state.connectionEvent = action.payload
    },
    updateConnectionByOutOfBandId: (state, action) => {
      state.isLoading = false
      state.id = action.payload.id
      state.state = action.payload.state
    },
    updateConnectionById: (state, action) => {
      state.isLoading = false
      state.state = action.payload.state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInvitation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createInvitation.fulfilled, (state, action) => {
        state.isLoading = false
        state.outOfBandId = action.payload.outOfBandRecord.id
        state.invitationUrl = action.payload.invitationUrl
      })
      .addCase(fetchConnectionByOutOfBandId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchConnectionByOutOfBandId.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.length > 0) {
          state.id = action.payload[0].id
          state.state = action.payload[0].state
        }
      })
      .addCase(fetchConnectionById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchConnectionById.fulfilled, (state, action) => {
        state.isLoading = false
        state.state = action.payload.state
      })
      .addCase('clearUseCase', (state) => {
        state.id = undefined
        state.state = undefined
        state.invitationUrl = undefined
        state.isLoading = false
      })
      .addCase('demo/resetDemo', (state) => {
        return {
          ...initialState,
          useLegacyInvitations: state.useLegacyInvitations,
        }
      })
      .addCase('demo/resetConfiguration', (state) => {
        state.useLegacyInvitations = initialState.useLegacyInvitations
      })
  },
})

export const {
  clearConnection,
  setUseLegacyInvitations,
  setConnectionEvent,
  updateConnectionByOutOfBandId,
  updateConnectionById,
} = connectionSlice.actions

export default connectionSlice.reducer
