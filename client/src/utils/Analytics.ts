import Plausible from 'plausible-tracker'

const { trackPageview, trackEvent } = Plausible({
  domain: 'demo.animo.id',
})

export { trackPageview, trackEvent }
