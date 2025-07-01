import type { RootState } from '../../store/configureStore'

import { useSelector } from 'react-redux'

export const useUseCaseState = () => useSelector((state: RootState) => state.useCases)
export const useAllUseCases = () => useSelector((state: RootState) => state.useCases.useCases)
