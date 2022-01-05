import type { Wallet } from '../content/types'

import { Get, JsonController } from 'routing-controllers'
import { Service } from 'typedi'

import { Wallets } from '../content/misc/Wallets'

@JsonController('/wallets')
@Service()
export class WalletController {
  private wallets: Wallet[]

  public constructor() {
    this.wallets = Wallets
  }

  @Get('/')
  public async getAll() {
    return this.wallets
  }
}
