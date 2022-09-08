import Plausible from 'plausible-tracker'

const { trackPageview, trackEvent } = Plausible({
  domain: 'cheqd-demo.animo.id',
})

export { trackPageview, trackEvent }
