import type { RootState, AppDispatch } from '../store/configureStore'
import type { TypedUseSelectorHook } from 'react-redux'

import { useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
