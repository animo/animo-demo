import { useQuery } from '@tanstack/react-query'
import * as UseCaseApi from '@/api/UseCaseApi'
import type { UseCase } from '@/slices/types'

export const useUseCasesByCharacter = (characterId: string) => {
  return useQuery<UseCase[]>({
    queryKey: ['useCases', 'character', characterId],
    queryFn: () => UseCaseApi.getUseCasesByCharId(characterId),
    enabled: !!characterId,
  })
}

export const useUseCase = (slug: string) => {
  return useQuery<UseCase>({
    queryKey: ['useCase', slug],
    queryFn: () => UseCaseApi.getUseCaseBySlug(slug),
    enabled: !!slug,
  })
}