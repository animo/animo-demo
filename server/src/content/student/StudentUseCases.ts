import type { CharWithUseCases } from '../types'

import { Student } from './Student'
import { Club } from './useCases/Club'
import { School } from './useCases/School'
import { Sport } from './useCases/Sport'
import { Noa } from './useCases/noa'

export const StudentUseCases: CharWithUseCases = {
  characterId: Student.id,
  useCases: [School, Noa,Club, Sport],
}
