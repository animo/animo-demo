import type { CharWithUseCases } from './types'

import { BusinessWomanUseCases } from './businessWoman/BusinesswomanUseCases'
import { MillennialUseCases } from './millennial/MillennialUseCases'
import { StudentUseCases } from './student/StudentUseCases'

const useCases: CharWithUseCases[] = [StudentUseCases, BusinessWomanUseCases, MillennialUseCases]

export default useCases
