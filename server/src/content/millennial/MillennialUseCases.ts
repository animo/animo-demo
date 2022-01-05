import type { CharWithUseCases } from '../types'

import { Millennial } from './Millennial'
import { House } from './useCases/House'
import { Job } from './useCases/Job'
import { Laptop } from './useCases/Laptop'

export const MillennialUseCases: CharWithUseCases = {
  characterId: Millennial.id,
  useCases: [Job, House, Laptop],
}
