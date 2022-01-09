import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

export const BusinessWoman: Character = {
  id: '2',
  image: '/public/businesswoman/businesswoman.svg',
  name: 'Ana',
  type: 'Businesswoman',
  backstory:
    "Ana is on her way to the top! She's the CEO of a fortune 500 company and is always working around the clock to keep business going, join her in her endeavor!",
  starterCredentials: [
    {
      id: uuid(),
      name: 'Animo ID Card',
      icon: '/public/businesswoman/icon-businesswoman.svg',
      attributes: [
        { name: 'Name', value: 'Ana Brown' },
        { name: 'Date of birth', value: '19910104' },
        { name: 'Street', value: 'Main Road 207' },
        { name: 'City', value: 'New York' },
        { name: 'Nationality', value: 'United States of America' },
      ],
    },
    {
      id: uuid(),
      name: 'Credit card',
      icon: '/public/businesswoman/icon-creditcard.png',
      attributes: [
        { name: 'Issuer', value: 'qBank New York' },
        { name: 'Holder', value: 'Ana Brown' },
        { name: 'Card number', value: '4537-6696-0666-0146' },
        { name: 'Security code', value: '063' },
        { name: 'Valid until', value: '20250315' },
      ],
    },
  ],
}
