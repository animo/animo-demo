import type { RootState } from '../../store/configureStore'

import { useSelector } from 'react-redux'

export const useConfiguration = () => useSelector((state: RootState) => state.configuration)
