import { createSlice } from '@reduxjs/toolkit'

interface ConfigurationState {
  invitationMethod: string
}

const initialState: ConfigurationState = {
  invitationMethod: 'legacy',
}

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setinvitationMethod: (state, action) => {
      state.invitationMethod = action.payload === 'oob' ? 'oob' : 'legacy'
      if (action.payload) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
  },
})

export const { setinvitationMethod } = configurationSlice.actions

export default configurationSlice.reducer
