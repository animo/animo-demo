import type { RootState } from '../../store/configureStore'

import { useSelector } from 'react-redux'

export const useOnboarding = () => useSelector((state: RootState) => state.onboarding)
