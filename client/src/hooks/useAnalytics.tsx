import Plausible from 'plausible-tracker'
import { useEffect } from 'react'

const { trackPageview } = Plausible()

export const useAnalytics = () => {
  useEffect(() => {
    Plausible({
      domain: 'demo.animo.id',
    })
    trackPageview()
  }, [])
}
