import type { StepperItem } from '../../../slices/types'

import { motion } from 'framer-motion'
import React from 'react'

export interface Props {
  steps: StepperItem[]
  stepCount: number
  sectionCount: number
  colorPrimary: string
  colorSecondary: string
}

export const StepperCard: React.FC<Props> = ({ steps, stepCount, sectionCount, colorPrimary, colorSecondary }) => {
  const stepViewItems = steps.map((item, idx) => {
    // if step section count equals step section count
    const equalSection = sectionCount === item.section - 1
    // get section of the previous step
    const prevStepSection = steps[idx - 1]?.section - 1 ?? 0
    // get stepCount of the previous section
    const prevStepCount = sectionCount === prevStepSection ? steps[idx - 1]?.steps ?? 0 : 0

    const on =
      // if current stepCount is higher then previous stepCount &&
      // currentStepCount is lower then steps for this stepItem
      (stepCount > prevStepCount && stepCount <= item.steps && equalSection) ||
      // if stepCount is bigger than steps for this stepItem
      (stepCount > item.steps && equalSection) ||
      // if sectionCount is higher than sectionCount for this stepItem
      sectionCount > item.section - 1

    return (
      <div className="flex flex-row" key={item.id}>
        <div className="flex flex-col">
          <div
            className="rounded-full h-7 w-7 p-3.5 ring-2 border-2 border-white dark:border-animo-darkgrey ring-animo-lightgrey dark:ring-animo-black mx-2 transition transition-all duration-300 "
            style={{ background: on ? colorPrimary : colorSecondary }}
          />
          {idx !== steps.length - 1 && (
            <div className="border-l-2 border-animo-lightgrey dark:border-animo-black border-rounded h-full m-auto" />
          )}
        </div>
        <div className={`flex flex-col mx-2 ${!on && 'opacity-40'}`}>
          <h1 className="font-medium">{item.name}</h1>
          <div className="my-2 mb-6 text-xs md:text-sm">{item.description}</div>
        </div>
      </div>
    )
  })

  return (
    <motion.div className="flex flex-col bg-white dark:bg-animo-darkgrey rounded-lg p-4 h-auto shadow mb-4">
      <div className="flex-1-1 title mb-2">
        <h1 className="font-semibold dark:text-white">Follow this path</h1>
        <hr className="text-animo-lightgrey" />
      </div>
      <div className="my-4">{stepViewItems}</div>
    </motion.div>
  )
}
