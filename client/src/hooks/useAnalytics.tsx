import { useEffect } from 'react'

import { trackPageview } from '../utils/Analytics'

export const useAnalytics = () => {
  useEffect(() => {
    trackPageview()
  }, [])
}
