export const page = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.25,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export const landingTitle = {
  hidden: { x: 20 },
  show: {
    x: 0,
    transition: { when: 'beforeChildren', staggerChildren: 0.25, duration: 0.5, ease: 'easeOut' },
  },
}

export const fade = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      when: 'afterChildren',
      staggerChildren: 0.5,
    },
  },
}

export const fadeDelay = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delay: 1,
      duration: 1,
      when: 'afterChildren',
      staggerChildren: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
}

export const characterFade = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
}

export const fadeExit = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
}

export const buttonHover = {
  scale: 1.02,
  opacity: 0.9,
  transition: { duration: 0.3 },
}

export const listHover = {
  scale: 1.02,
  transition: { duration: 0.3 },
}

export const fadeX = {
  hidden: { x: 10, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { when: 'beforeChildren', delay: 0.3, duration: 0.5 },
  },
  exit: {
    x: -10,
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

export const rowFadeX = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
}

export const topDown = {
  hidden: { y: -100 },
  show: {
    y: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    y: -100,
    transition: {
      duration: 0.5,
      when: 'afterChildren',
    },
  },
}

export const rowContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const dashboardSub = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.3,
    },
  },
}

export const dashboardTitle = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      when: 'beforeChildren',
    },
  },
}

export const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  show: {
    y: '-50px',
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    y: '-100vh',
    opacity: 0,
  },
}

export const standardFade = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
  exit: { opacity: 0 },
}

export const leftRight = {
  hidden: { x: '-100vh' },
  show: {
    x: 0,
    transition: {
      duration: 0.2,
      type: 'spring',
      damping: 10,
      stiffness: 30,
    },
  },
  exit: {
    x: '-100vh',
    transition: {
      duration: 0.5,
      when: 'afterChildren',
    },
  },
}

export const rightLeft = {
  hidden: { x: '100vh' },
  show: {
    x: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    x: '-100vh',
    transition: {
      duration: 0.5,
      when: 'afterChildren',
    },
  },
}

export const confettiFade = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 2,
    },
  },
}
