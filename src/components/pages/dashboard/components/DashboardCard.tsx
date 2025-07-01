import type { ReactElement } from 'react'

import { motion } from 'framer-motion'
import React from 'react'

import { fade } from '../../../FramerAnimations'

export interface Props {
  title: string
  info: string
  button?: ReactElement
}

export const DashboardCard: React.FC<Props> = ({ title, info, button }) => {
  return (
    <div className="bg-white dark:bg-animo-darkgrey dark:text-white rounded-lg h-auto w-auto shadow-sm p-4 md:p-6 lg:p-8 lg:mb-4">
      <motion.div initial="hidden" animate="show" exit="exit" variants={fade}>
        <h1 className="font-bold text-lg mb-2">{title}</h1>
        <p className="text-sm xl:text-base ">{info}</p>
        <div className="flex flex-1 items-end justify-end mt-2">{button}</div>
      </motion.div>
    </div>
  )
}
