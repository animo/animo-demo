import type { CharWithUseCases } from '../types'

import { Student } from './Student'
import { Club } from './useCases/Club'
import { MorgageLoan } from './useCases/MorgageLoan'
import { School } from './useCases/School'
import { Sport } from './useCases/Sport'
import { Noa } from './useCases/noa'

export const StudentUseCases: CharWithUseCases = {
  characterId: Student.id,
  useCases: [School,Noa,MorgageLoan,Club, Sport],
}
