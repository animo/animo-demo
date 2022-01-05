import type { RootState } from '../../store/configureStore'

import { useSelector } from 'react-redux'

export const useSection = () => useSelector((state: RootState) => state.section)
