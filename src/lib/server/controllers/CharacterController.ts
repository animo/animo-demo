import type { Character } from '../content/types'

import { Get, JsonController, NotFoundError, Param } from 'routing-controllers'
import { Inject, Service } from 'typedi'

import characters from '../content/Characters'

import { CredDefService } from './CredDefService'

@JsonController('/characters')
@Service()
export class CharacterController {
  @Inject()
  private service: CredDefService

  public constructor(service: CredDefService) {
    this.service = service
  }

  /**
   * Retrieve character by id
   */
  @Get('/:characterId')
  public async getCharacterById(@Param('characterId') characterId: string) {
    const character = characters.find((x) => x.id === characterId)

    if (!character) {
      throw new NotFoundError(`character with characterId "${characterId}" not found.`)
    }

    const lol = character.starterCredentials.map((x) => ({
      ...x,
      credentialDefinitionId: this.service.getCredentialDefinitionIdByTag(x.name),
    }))

    character.starterCredentials = lol
    return character
  }

  /**
   * Retrieve all characters
   */
  @Get('/')
  public async getCharacters() {
    const arr: Character[] = []
    characters.forEach((char) => {
      arr.push({
        ...char,
        starterCredentials: char.starterCredentials.map((x) => ({
          ...x,
          credentialDefinitionId: this.service.getCredentialDefinitionIdByTag(x.name),
        })),
      })
    })
    return arr
  }
}
