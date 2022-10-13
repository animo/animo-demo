import type { ProofRecord } from '@aries-framework/core'

import { createSlice } from '@reduxjs/toolkit'

import { createProof, createProofOOB, fetchProofById } from './proofThunks'

interface ProofState {
  proof?: ProofRecord
  proofUrl?: string
  isLoading: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  proofEvent: any | undefined
}

const initialState: ProofState = {
  proof: undefined,
  proofUrl: undefined,
  isLoading: false,
  proofEvent: undefined,
}

const proofSlice = createSlice({
  name: 'proof',
  initialState,
  reducers: {
    clearProof: (state) => {
      state.proof = undefined
      state.proofUrl = undefined
      state.isLoading = false
    },
    setProofEvent: (state, action) => {
      state.proofEvent = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProof.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProof.fulfilled, (state, action) => {
        state.isLoading = false
        state.proof = action.payload
      })
      .addCase(createProofOOB.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProofOOB.fulfilled, (state, action) => {
        state.isLoading = false
        state.proofUrl = action.payload.proofUrl
        state.proof = action.payload.proofRecord
      })
      .addCase(fetchProofById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProofById.fulfilled, (state, action) => {
        state.isLoading = false
        state.proof = action.payload
      })
      .addCase('clearUseCase', (state) => {
        state.proof = undefined
        state.isLoading = false
      })
      .addCase('demo/resetDemo', () => {
        return initialState
      })
  },
})

export const { clearProof, setProofEvent } = proofSlice.actions

export default proofSlice.reducer
