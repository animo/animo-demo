import { motion } from 'framer-motion'
import React from 'react'

export interface Props {
  title: string
  description?: string
}

export const StepInfo: React.FC<Props> = ({ title, description }) => {
  return (
    <motion.div className="leading-loose">
      <h1 className="text-2xl xl:text-4xl font-bold md:mb-4">{title}</h1>
      {description && <p className="pt-4 mb-4">{description}</p>}
    </motion.div>
  )
}
