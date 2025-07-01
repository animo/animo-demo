import { useQuery } from '@tanstack/react-query'
import * as CharacterApi from '@/api/CharacterApi'
import type { Character } from '@/slices/types'

export const useCharacters = () => {
  return useQuery<Character[]>({
    queryKey: ['characters'],
    queryFn: CharacterApi.getCharacters,
  })
}

export const useCharacter = (id: string) => {
  return useQuery<Character>({
    queryKey: ['character', id],
    queryFn: () => CharacterApi.getCharacterById(id),
    enabled: !!id,
  })
}