import { createSlice } from '@reduxjs/toolkit'

interface ConfigurationState {
  useLegacyInvitations: boolean
}

const initialState: ConfigurationState = {
  useLegacyInvitations: true,
}

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setUseLegacyInvitations: (state, action) => {
      state.useLegacyInvitations = action.payload
    },
  },
})

export const { setUseLegacyInvitations } = configurationSlice.actions

export default configurationSlice.reducer
