import type { CharWithUseCases } from '../types'

import { Student } from './Student'
import { Club } from './useCases/Club'
import { School } from './useCases/School'
import { Sport } from './useCases/Sport'

export const StudentUseCases: CharWithUseCases = {
  characterId: Student.id,
  useCases: [School, Club, Sport],
}
