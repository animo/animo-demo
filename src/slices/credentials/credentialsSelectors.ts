import type { RootState } from '../../store/configureStore'

import { useSelector } from 'react-redux'

export const useCredentials = () => useSelector((state: RootState) => state.credentials)
