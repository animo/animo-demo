import type { RootState } from '../../store/configureStore'

import { useSelector } from 'react-redux'

export const useConnection = () => useSelector((state: RootState) => state.connection)
export const useConnectionId = () => useSelector((state: RootState) => state.connection.id)
