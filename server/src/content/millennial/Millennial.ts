import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

export const Millennial: Character = {
  id: '3',
  image: '/public/millennial/millennial.svg',
  name: 'Karim',
  type: 'Millennial',
  backstory:
    'Web designer Karim loves to explore. He has spent the last year as a digital nomad, traveling and working around the globe, guide him through his next adventure!',
  starterCredentials: [
    {
      id: uuid(),
      name: 'Animo ID Card',
      icon: '/public/millennial/icon-millennial.svg',
      attributes: [
        { name: 'Name', value: 'Karim Müller' },
        { name: 'Date of birth', value: '19940904' },
        { name: 'Street', value: 'Dorfstrasse 23' },
        { name: 'City', value: 'Zürich' },
        { name: 'Nationality', value: 'Switzerland' },
      ],
    },
    {
      id: uuid(),
      name: `Master's Degree`,
      icon: '/public/millennial/icon-degree.svg',
      attributes: [
        { name: 'Institute', value: 'University of Zürich' },
        { name: 'Graduate', value: 'Karim Müller' },
        { name: 'Date', value: '2016/08/31' },
        { name: 'Field', value: 'Software Programming' },
      ],
    },
    {
      id: uuid(),
      name: `Crypto Wallet`,
      icon: '/public/millennial/icon-crypto-wallet.png',
      attributes: [
        { name: 'Address', value: '34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo' },
        { name: 'Balance', value: '500000' },
      ],
    },
  ],
}
