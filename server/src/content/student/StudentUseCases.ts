import type { CharWithUseCases } from '../types'

import { Student } from './Student'
import { Event } from './useCases/Event'

export const StudentUseCases: CharWithUseCases = {
  characterId: Student.id,
  useCases: [Event],
}
