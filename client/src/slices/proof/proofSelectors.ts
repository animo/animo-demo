import type { RootState } from '../../store/configureStore'

import { useSelector } from 'react-redux'

export const useProof = () => useSelector((state: RootState) => state.proof)
