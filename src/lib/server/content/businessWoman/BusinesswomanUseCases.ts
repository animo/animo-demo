import type { CharWithUseCases } from '../types'

import { BusinessWoman } from './BusinessWoman'
import { AirTravel } from './useCases/Airtravel'
import { Conference } from './useCases/Conference'
import { Hotel } from './useCases/Hotel'

export const BusinessWomanUseCases: CharWithUseCases = {
  characterId: BusinessWoman.id,
  useCases: [Conference, Hotel, AirTravel],
}
