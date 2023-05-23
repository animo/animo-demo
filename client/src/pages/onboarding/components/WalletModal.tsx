import { AnimatePresence, motion } from 'framer-motion'

import { standardFade, dropIn } from '../../../FramerAnimations'
import appStore from '../../../assets/light/icon-app-store.png'
import playStore from '../../../assets/light/icon-play-store.png'
import { SmallButton } from '../../../components/SmallButton'

const QRCode = require('qrcode.react')

export interface Wallet {
  id: number
  name: string
  icon: string
  url: string
  apple: string
  android: string
  ledgerImage?: string
}

export interface Props {
  isWalletModalOpen: boolean
  setIsWalletModalOpen: (open: boolean) => void
  wallet: Wallet
  onCompleted(): void
}

export const WalletModal: React.FC<Props> = ({ isWalletModalOpen, setIsWalletModalOpen, wallet, onCompleted }) => {
  return (
    <AnimatePresence>
      {isWalletModalOpen && (
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
              onClick={() => setIsWalletModalOpen(false)}
              className="fixed inset-0 bg-animo-black bg-opacity-50 transition-opacity z-0"
              aria-hidden="true"
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" />

            <motion.div
              variants={dropIn}
              initial="hidden"
              animate="show"
              exit="exit"
              className="bg-animo-white z-40 dark:bg-animo-black inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition transition-all duration-300 sm:my-8 sm:align-middle sm:max-w-xl sm:w-full dark:text-white"
            >
              <div className=" px-2 md:px-6 pt-2 sm:mt-4 sm:pb-4">
                <div className="flex items-start px-4 sm:px-0 ">
                  <div className="w-48 hidden sm:block ">
                    <div className="p-4 dark:bg-animo-darkgrey rounded-lg ">
                      <QRCode size={164} value={wallet.url} />
                    </div>
                  </div>
                  <div className="mt-3 pl-2 sm:mt-0 sm:ml-4 text-left">
                    <h2 className="text-lg leading-loose font-medium">1. Download the {wallet.name}</h2>
                    <div className="mt-2">
                      <p className="text-sm">
                        You can scan the QR-code or click the button to your favorite download store below.
                      </p>
                    </div>
                    <div className="flex flex-row my-2 mb-4 justify-center sm:justify-start">
                      <a href={wallet.apple} target="_blank" rel="noreferrer">
                        <img className="h-8 m-2" src={appStore} alt="app-store" />
                      </a>
                      <a href={wallet.android} target="_blank" rel="noreferrer">
                        <img className="h-8 m-2" src={playStore} alt="play-store" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {wallet.ledgerImage && (
                <>
                  <div className="px-8 opacity-20">
                    <hr />
                  </div>
                  <div className="px-2 md:px-6 pt-2 sm:mt-4 sm:pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-start px-4 sm:px-0">
                      <div className="flex-1-1 order-last my-4 sm:my-0 sm:order-first w-48 m-auto">
                        <div className="dark:bg-animo-darkgrey rounded-lg ">
                          <img
                            className="shadow-lg rounded-lg border border-1 border-animo-lightgrey"
                            src={wallet.ledgerImage}
                            alt={wallet.name}
                          />
                        </div>
                      </div>
                      <div className="mt-3 pl-2 flex-1 sm:mt-0 sm:ml-4 text-left">
                        <h2 className="text-lg leading-loose font-medium">2. Changing the network</h2>
                        <div className="mt-2">
                          <p className="text-sm pb-2">- Open the settings</p>
                          <p className="text-sm pb-2">- Change the network to:</p>
                          <p className="text-sm pb-2">
                            &nbsp;&nbsp;&nbsp;&nbsp; <strong>Bcovrin Test Network</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="px-4 pb-4 flex justify-end">
                <SmallButton onClick={onCompleted} text={'I HAVE MY WALLET'} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
