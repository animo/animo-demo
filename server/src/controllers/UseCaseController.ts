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
      .find((u) => u.useCases.find((y) => y.slug === useCaseSlug))
      ?.useCases.find((z) => z.slug === useCaseSlug)

    if (!useCase) throw new NotFoundError(`use case with slug "${useCaseSlug}" not found.`)

    const newSection: Section[] = []

    useCase.sections.forEach((section) => {
      newSection.push({
        ...section,
        issueCredentials: section.issueCredentials?.map((issueCredential) => ({
          ...issueCredential,
          credentialDefinitionId: this.service.getCredentialDefinitionIdByTag(issueCredential.name),
        })),
        requestedCredentials: section.requestedCredentials?.map((requestedCredential) => ({
          ...requestedCredential,
          credentialDefinitionId: this.service.getCredentialDefinitionIdByTag(requestedCredential.name),
        })),
      })
    })

    useCase.sections = newSection

    return useCase
  }

  /**
   * Retrieve all usecases for given character id
   */
  @Get('/character/:characterId')
  public async getUseCasesByCharId(@Param('characterId') characterId: string) {
    const UCs = useCases.find((x) => x.characterId === characterId)

    if (!UCs) throw new NotFoundError(`Use cases for character with characterId "${characterId}" not found.`)

    const reformattedUseCases: UseCase[] = []

    UCs.useCases.forEach((u) => {
      const newSection: Section[] = []

      u.sections.forEach((section) => {
        newSection.push({
          ...section,
          issueCredentials: section.issueCredentials?.map((issuedCredential) => ({
            ...issuedCredential,
            credentialDefinitionId: this.service.getCredentialDefinitionIdByTag(issuedCredential.name),
          })),
          requestedCredentials: section.requestedCredentials?.map((requestedCredential) => ({
            ...requestedCredential,
            credentialDefinitionId: this.service.getCredentialDefinitionIdByTag(requestedCredential.name),
          })),
        })
      })

      u.sections = newSection
      reformattedUseCases.push(u)
    })

    return UCs.useCases
  }
}
