import balloonDark from '../assets/dark/icon-balloon-dark.svg'
import moonDark from '../assets/dark/icon-moon-dark.svg'
import notificationDark from '../assets/dark/icon-notification-dark.svg'
import personDark from '../assets/dark/icon-person-dark.svg'
import walletDark from '../assets/dark/icon-wallet-dark.svg'
import balloonLight from '../assets/light/icon-balloon-light.svg'
import moonLight from '../assets/light/icon-moon-light.svg'
import notificationLight from '../assets/light/icon-notification-light.svg'
import personLight from '../assets/light/icon-person-light.svg'
import walletLight from '../assets/light/icon-wallet-light.svg'

export interface StepperStep {
  name: string
  onboardingStep: number
  iconLight: string
  iconDark: string
}

export const steps: StepperStep[] = [
  { name: 'moon', onboardingStep: 0, iconLight: moonLight, iconDark: moonDark },
  { name: 'wallet', onboardingStep: 1, iconLight: walletLight, iconDark: walletDark },
  { name: 'person', onboardingStep: 2, iconLight: personLight, iconDark: personDark },
  { name: 'notification', onboardingStep: 5, iconLight: notificationLight, iconDark: notificationDark },
  { name: 'balloon', onboardingStep: 6, iconLight: balloonLight, iconDark: balloonDark },
]
