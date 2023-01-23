import type { Wallet } from '../types'

const indicioHoldrPlus: Wallet = {
  id: 5,
  name: 'Holdr+',
  organization: 'Indicio PBC.',
  recommended: false,
  icon: '/public/wallets/icon-holdr+.jpeg',
  url: 'https://onelink.to/2wbkw7',
  apple: 'https://apps.apple.com/us/app/holdr/id1620628623',
  android: 'https://play.google.com/store/apps/details?id=tech.indicio.holdrplus',
}

const bcWallet: Wallet = {
  id: 4,
  name: 'BC Wallet',
  organization: 'Province of British Columbia, Canada',
  recommended: false,
  icon: '/public/wallets/icon-bc-wallet.jpeg',
  url: 'https://onelink.to/nk4wrv',
  apple: 'https://apps.apple.com/us/app/bc-wallet/id1587380443',
  android: 'https://play.google.com/store/apps/details?id=ca.bc.gov.BCWallet',
}

const orbitEdge: Wallet = {
  id: 3,
  name: 'Orbit Edge',
  organization: 'Northern Block Inc.',
  recommended: false,
  icon: '/public/wallets/icon-orbit-edge.png',
  url: 'https://onelink.to/bh2hcz',
  apple: 'https://apps.apple.com/us/app/orbit-edge/id1508037063',
  android: 'https://play.google.com/store/apps/details?id=com.northernblock',
}

export const Wallets: Wallet[] = [
  {
    id: 1,
    name: 'Lissi Wallet',
    organization: 'Main Incubator GmbH',
    recommended: true,
    icon: '/public/wallets/icon-lissi.jpeg',
    url: 'http://onelink.to/jhrpj6',
    apple: 'https://apps.apple.com/us/app/lissi-wallet/id1529848685',
    android: 'https://play.google.com/store/apps/details?id=io.lissi.mobile.android',
  },
  {
    id: 2,
    name: 'Trinsic Wallet',
    organization: 'Trinsic',
    recommended: false,
    icon: '/public/wallets/icon-trinsic.jpeg',
    url: 'http://onelink.to/ypth69',
    apple: 'https://apps.apple.com/us/app/streetcred-identity-agent/id1475160728',
    android: 'https://play.google.com/store/apps/details?id=id.streetcred.apps.mobile',
    ledgerImage: 'https://i.imgur.com/SINVCJv.png',
  },
]
