import type { RootState } from '../../store/configureStore'

import { useSelector } from 'react-redux'

export const useCharacters = () => useSelector((state: RootState) => state.characters)
export const useCurrentCharacter = () => useSelector((state: RootState) => state.characters.currentCharacter)
