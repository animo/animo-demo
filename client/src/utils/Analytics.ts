import Plausible from 'plausible-tracker'

const { trackPageview, trackEvent } = Plausible({
  domain: 'demo.animo.id',
  trackLocalhost: true,
})

export { trackPageview, trackEvent }
