import { motion } from 'framer-motion'

interface Props {
  color?: string
}

export const Line: React.FC<Props> = ({ color }) => {
  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 124 4" width="100" height="4">
      <motion.path stroke={color} strokeWidth={3} d="M0 2H123.5" />
    </motion.svg>
  )
}
