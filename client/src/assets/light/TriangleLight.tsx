import { motion } from 'framer-motion'

export function TriangleLight() {
  return (
    <motion.svg
      whileHover={{ scale: 0.7 }}
      initial={{ x: 140, scale: 0.6 }}
      animate={{ x: 80, scale: 0.6 }}
      transition={{ duration: 0.75 }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 28"
      width="24"
      height="28"
    >
      <motion.path
        fill="white"
        stroke="#FB9C9C"
        strokeWidth={2}
        d="M23.0255 26.2784L2.10756 14.0131L23.1886 2.03023L23.0255 26.2784Z"
      />
    </motion.svg>
  )
}
