import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

export const Student: Character = {
  id: '1',
  image: '/public/student/student.svg',
  name: 'Not Ankur',
  type: 'Developer',
  backstory:
    'Not Ankur loves to code. He has spent the last year as a digital nomad, traveling and working around the globe, guide him through his next adventure!',
  starterCredentials: [
    {
      id: uuid(),
      name: 'Animo ID Card',
      icon: '/public/student/icon-student.svg',
      attributes: [
        { name: 'Name', value: 'Jan van Dalen' },
        { name: 'Date of birth', value: '19990101' },
        { name: 'Street', value: 'Ambachtstraat 61' },
        { name: 'City', value: 'Utrecht' },
        { name: 'Nationality', value: 'The Netherlands' },
      ],
    },
  ],
}
