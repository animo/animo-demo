import { AnimatePresence, motion } from 'framer-motion'

import { dropIn, standardFade } from '../FramerAnimations'

import { SmallButton } from './SmallButton'
import { SmallButtonText } from './SmallButtonText'

export interface Props {
  onOk(): void
  onCancel?(): void
  title: string
  description: string
}

export const Modal: React.FC<Props> = ({ onOk, onCancel, title, description }) => {
  return (
    <AnimatePresence>
      <motion.div
        variants={standardFade}
        initial="hidden"
        animate="show"
        exit="exit"
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-animo-black bg-opacity-50 transition-opacity" aria-hidden="true" />
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" />
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="show"
            exit="exit"
            className="bg-animo-white dark:bg-animo-black inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition transition-all duration-300 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:text-white"
          >
            <div className=" px-4 pt-2 mt-4 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 sm:mt-0 sm:ml-4 text-left">
                  <h2 className="text-xl font-medium">{title}</h2>
                  <div className="mt-2">
                    <p className="text-sm">{description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 pb-4 sm:px-6 flex flex-row-reverse">
              <SmallButton onClick={onOk} text={'OK'} disabled={false} />
              {onCancel && <SmallButtonText onClick={onCancel} text={'CANCEL'} disabled={false} />}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
