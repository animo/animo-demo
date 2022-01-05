import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

interface PreferencesState {
  darkMode: boolean
  completedUseCaseSlugs: string[]
  demoCompleted: boolean
}

const initialState: PreferencesState = {
  darkMode: false,
  completedUseCaseSlugs: [],
  demoCompleted: false,
}

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      localStorage.setItem('theme', action.payload ? 'dark' : 'light')

      if (action.payload) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      state.darkMode = action.payload ?? !state.darkMode
    },
    useCaseCompleted: (state, action: PayloadAction<string>) => {
      state.completedUseCaseSlugs.push(action.payload)
    },
    setDemoCompleted: (state) => {
      state.demoCompleted = true
    },
    resetDashboard: (state) => {
      state.completedUseCaseSlugs = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase('demo/RESET', (state) => {
      state.darkMode = localStorage.getItem('theme') === 'dark'
    })
  },
})

export const { setDarkMode, useCaseCompleted, resetDashboard, setDemoCompleted } = preferencesSlice.actions

export default preferencesSlice.reducer
