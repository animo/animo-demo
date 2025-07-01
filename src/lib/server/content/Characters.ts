import type { Character } from './types'

import { BusinessWoman } from './businessWoman/BusinessWoman'
import { Millennial } from './millennial/Millennial'
import { Student } from './student/Student'

const characters: Character[] = [Student, BusinessWoman, Millennial]

export default characters
