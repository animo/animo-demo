import { AnimatePresence, motion } from 'framer-motion'

import { standardFade, dropIn } from '../../../FramerAnimations'
import { SmallButton } from '../../../components/SmallButton'

export interface Props {
  action(): void
  close?(): void
}

export const FailedRequestModal: React.FC<Props> = ({ action, close }) => {
  const MODAL_TITLE = `That's not what we expected.`

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
          <div
            className="fixed inset-0 bg-animo-black bg-opacity-50 transition-opacity transition transition-all duration-300"
            aria-hidden="true"
            onClick={close}
          />

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
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h2 className="text-xl font-medium text-grey-900">{MODAL_TITLE}</h2>
                  <div className="mt-2">
                    <p className="text-sm">
                      Try closing the wallet on your phone and open it again. If the problem continues, we can{' '}
                      <u className="cursor-pointer" onClick={action}>
                        send a new request.
                      </u>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4 sm:px-6 flex flex-row-reverse">
              <SmallButton onClick={close} text={'OK'} disabled={false} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
