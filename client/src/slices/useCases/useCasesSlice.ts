import type { UseCase } from '../types'

import { createSlice } from '@reduxjs/toolkit'

import { fetchUseCaseBySlug, fetchAllUseCasesByCharId } from './useCasesThunks'

interface UseCaseState {
  useCases: UseCase[]
  currentUseCase?: UseCase
  sectionCount: number
  stepCount: number
  isLoading: boolean
}

const initialState: UseCaseState = {
  useCases: [],
  currentUseCase: undefined,
  sectionCount: 0,
  stepCount: 0,
  isLoading: false,
}

const useCaseSlice = createSlice({
  name: 'useCase',
  initialState,
  reducers: {
    nextSection: (state) => {
      state.sectionCount++
      state.stepCount = 0
    },
    resetStep: (state) => {
      state.stepCount = 0
    },
    nextStep: (state) => {
      state.stepCount++
    },
    prevStep: (state) => {
      state.stepCount--
    },
    clearUseCase: (state) => {
      state.currentUseCase = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUseCasesByCharId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchAllUseCasesByCharId.fulfilled, (state, action) => {
        state.isLoading = false
        state.useCases = action.payload
      })
      .addCase(fetchUseCaseBySlug.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUseCaseBySlug.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentUseCase = action.payload
      })
      .addCase('clearUseCase', (state) => {
        state.currentUseCase = undefined
        state.sectionCount = 0
        state.stepCount = 0
      })
      .addCase('demo/resetState', () => {
        return initialState
      })
  },
})

export const { nextSection, resetStep, nextStep, prevStep, clearUseCase } = useCaseSlice.actions

export default useCaseSlice.reducer
