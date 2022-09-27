import { createSlice } from '@reduxjs/toolkit'

interface ConfigurationState {
  useLegacyInvitation: boolean
}

const initialState: ConfigurationState = {
  useLegacyInvitation: true,
}

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setLegacyInvitation: (state, action) => {
      state.useLegacyInvitation = action.payload
    },
  },
})

export const { setLegacyInvitation } = configurationSlice.actions

export default configurationSlice.reducer
