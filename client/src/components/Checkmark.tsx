import { motion } from 'framer-motion'
import React from 'react'

import { fadeX } from '../FramerAnimations'

export interface Props {
  colorCircle?: string
  colorMark?: string
  height?: string
}

export const CheckMark: React.FC<Props> = ({ colorCircle, colorMark, height }) => {
  return (
    <motion.svg
      variants={fadeX}
      initial="hidden"
      animate="show"
      exit="exit"
      className={`h-${height ?? 6}`}
      width="50"
      height="50"
      viewBox="0 0 101 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50.5" cy="50.5" r="50.5" fill={`${colorCircle ?? '#04A45C'}`} />
      <path
        d="M85.6248 29.3202L79.8219 23.393C79.5911 23.131 79.2284 23 78.8987 23C78.536 23 78.2063 23.131 77.9755 23.393L37.7503 63.6392L23.111 49.0995C22.8472 48.8375 22.5175 48.7065 22.1878 48.7065C21.8581 48.7065 21.5283 48.8375 21.2646 49.0995L15.3957 54.9284C14.8681 55.4524 14.8681 56.2711 15.3957 56.795L33.8597 75.1334C35.0466 76.3123 36.4974 77 37.7173 77C39.4648 77 40.9815 75.7229 41.542 75.1989H41.575L85.6578 31.1868C86.1194 30.6301 86.1194 29.8114 85.6248 29.3202V29.3202Z"
        fill={`${colorMark ?? '#f1f1f1'}`}
      />
    </motion.svg>
  )
}
