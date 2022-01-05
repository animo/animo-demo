import type { RootState } from '../../store/configureStore'

import { useSelector } from 'react-redux'

export const useWallets = () => useSelector((state: RootState) => state.wallets)
