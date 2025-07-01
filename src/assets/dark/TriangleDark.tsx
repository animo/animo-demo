import { motion } from 'framer-motion'

export function TriangleDark() {
  return (
    <motion.svg
      whileHover={{ scale: 0.7 }}
      initial={{ x: 80, scale: 0.6 }}
      animate={{ x: 140, scale: 0.6 }}
      transition={{ duration: 0.75 }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 28"
      width="24"
      height="28"
    >
      <motion.path fill="black" stroke="#557EBA" strokeWidth={2} d="M1 1.87564L22 14L1 26.1244L1 1.87564Z" />
    </motion.svg>
  )
}
