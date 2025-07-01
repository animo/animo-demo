import type { RootState } from '../../store/configureStore'

import { useSelector } from 'react-redux'

export const usePreferences = () => useSelector((state: RootState) => state.preferences)
