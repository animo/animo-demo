import { useQuery } from '@tanstack/react-query'
import * as WalletApi from '@/api/WalletApi'
import type { Wallet } from '@/slices/types'

export const useWallets = () => {
  return useQuery<Wallet[]>({
    queryKey: ['wallets'],
    queryFn: WalletApi.getWallets,
  })
}