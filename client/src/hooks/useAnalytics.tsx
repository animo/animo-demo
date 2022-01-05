import { init, trackPages } from 'insights-js'
import { useEffect } from 'react'

export const useAnalytics = () => {
  useEffect(() => {
    const INSIGHTS_PROJECT_ID = process.env.REACT_APP_INSIGHTS_PROJECT_ID

    if (INSIGHTS_PROJECT_ID && INSIGHTS_PROJECT_ID !== '') {
      init(INSIGHTS_PROJECT_ID)
      trackPages()
    }
  }, [])
}
