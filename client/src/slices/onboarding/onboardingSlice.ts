import { createSlice } from '@reduxjs/toolkit'

interface OnboardingState {
  onboardingStep: number
  connectionId?: string
  isCompleted: boolean
}

const initialState: OnboardingState = {
  onboardingStep: 0,
  connectionId: undefined,
  isCompleted: false,
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    nextOnboardingStep(state) {
      state.onboardingStep++
    },
    prevOnboardingStep(state) {
      state.onboardingStep--
    },
    completeOnboarding(state) {
      state.isCompleted = true
    },
    setOnboardingConnectionId(state, action) {
      state.connectionId = action.payload
    },
    resetOnboarding(state) {
      state.connectionId = undefined
      state.onboardingStep = 0
      state.isCompleted = false
    },
  },
})

export const {
  nextOnboardingStep,
  prevOnboardingStep,
  completeOnboarding,
  setOnboardingConnectionId,
  resetOnboarding,
} = onboardingSlice.actions

export default onboardingSlice.reducer
