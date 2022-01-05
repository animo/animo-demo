import type { Section, UseCase } from './../content/types'

import { Get, JsonController, NotFoundError, Param } from 'routing-controllers'
import { Inject, Service } from 'typedi'

import useCases from '../content/UseCases'

import { CredDefService } from './CredDefService'

@JsonController('/usecases')
@Service()
export class UseCaseController {
  @Inject()
  private service: CredDefService

  public constructor(service: CredDefService) {
    this.service = service
  }

  /**
   * Retrieve use case by slug
   */
  @Get('/:useCaseSlug')
  public async getUseCaseBySlug(@Param('useCaseSlug') useCaseSlug: string) {
    const useCase = useCases
      .find((x) => x.useCases.find((y) => y.slug === useCaseSlug))
      ?.useCases.find((z) => z.slug === useCaseSlug)

    if (!useCase) {
      throw new NotFoundError(`use case with slug "${useCaseSlug}" not found.`)
    }

    const nwsec: Section[] = []

    useCase.sections.forEach((section) => {
      nwsec.push({
        ...section,
        issueCredentials: section.issueCredentials?.map((x) => ({
          ...x,
          credentialDefinitionId: this.service.getCredentialDefinitionIdByTag(x.name),
        })),
        requestedCredentials: section.requestedCredentials?.map((x) => ({
          ...x,
          credentialDefinitionId: this.service.getCredentialDefinitionIdByTag(x.name),
        })),
      })
    })

    useCase.sections = nwsec

    return useCase
  }

  /**
   * Retrieve all usecases for given character id
   */
  @Get('/character/:characterId')
  public async getUseCasesByCharId(@Param('characterId') characterId: string) {
    const UCs = useCases.find((x) => x.characterId === characterId)

    if (!UCs) {
      throw new NotFoundError(`Use cases for character with characterId "${characterId}" not found.`)
    }
    // eslint-disable-next-line no-console
    const lol: UseCase[] = []

    UCs.useCases.forEach((x) => {
      const nwsec: Section[] = []

      x.sections.forEach((section) => {
        nwsec.push({
          ...section,
          issueCredentials: section.issueCredentials?.map((x) => ({
            ...x,
            credentialDefinitionId: this.service.getCredentialDefinitionIdByTag(x.name),
          })),
          requestedCredentials: section.requestedCredentials?.map((x) => ({
            ...x,
            credentialDefinitionId: this.service.getCredentialDefinitionIdByTag(x.name),
          })),
        })
      })

      x.sections = nwsec
      lol.push(x)
    })

    return UCs.useCases
  }
}
