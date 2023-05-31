import { motion } from 'framer-motion'
import React from 'react'
import { FiExternalLink, FiArrowRight } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

import { buttonHover, fade, fadeDelay, landingTitle } from '../../../FramerAnimations'
import homeIllustrationDark from '../../../assets/dark/animo-home-illustration-dark.svg'
import homeIllustrationLight from '../../../assets/light/animo-home-illustration-light.svg'
import { useDarkMode } from '../../../hooks/useDarkMode'

export const MainSection: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const darkMode = useDarkMode()

  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/demo')
  }

  const renderMobileTitle = (
    <motion.div className="flex-1 dark:text-white text-left text-4xl font-semibold my-8 leading-snug ">
      <h1>
        <div className="overflow-hidden py-1">
          <motion.p variants={landingTitle}>Decentralized </motion.p>
          <motion.p variants={landingTitle}>identity is changing </motion.p>
        </div>
        <div className="overflow-hidden py-1">
          <motion.span variants={fade} className="text-6xl text-animo-coral dark:text-animo-blue filter drop-shadow">
            the future.
          </motion.span>
        </div>
      </h1>
      <div className="overflow-hidden">
        <motion.h2 variants={fade} className="text-lg font-normal mt-6 dark:text-animo-lightgrey text-animo-darkgrey">
          Experience a world where self-sovereign identity is the standard.
        </motion.h2>
      </div>
      <div className="flex flex-col justify-center text-base sxl:text-lg font-normal mt-6 m-auto">
        <motion.button
          variants={fade}
          whileHover={buttonHover}
          className="bg-animo-black dark:bg-animo-white text-animo-white dark:text-animo-black py-3 px-5 mx-8 rounded-lg font-semibold shadow-sm dark:shadow-none select-none "
          onClick={handleStart}
        >
          Try Demo &nbsp;
          <FiArrowRight className="inline h-6 pb-1" />
        </motion.button>
        <motion.button
          variants={fade}
          whileHover={buttonHover}
          className="bg-white dark:bg-black text-black dark:text-white py-3 px-5 mx-8 mt-4 rounded-lg font-semibold shadow-sm dark:shadow-none select-none "
          onClick={() => window.open('https://www.canada.ca/en/revenue-agency.html', '_blank')}
        >
          Get to know us &nbsp;
          <FiExternalLink className="inline h-6 pb-1" />
        </motion.button>
      </div>
    </motion.div>
  )

  const renderDesktopTitle = (
    <motion.div className="flex-1 text-left text-animo-black dark:text-animo-white font-semibold text-4xl lg:text-5xl xl:text-6xl m-auto">
      <h1>
        <div className="overflow-hidden py-1 leading-tight">
          <motion.p variants={landingTitle}>Decentralized</motion.p>
        </div>
        <div className="overflow-hidden py-1 leading-tight">
          <motion.p variants={landingTitle}>identity is changing </motion.p>
          <motion.span variants={fade} className="text-animo-coral dark:text-animo-blue filter drop-shadow">
            the future.
          </motion.span>
        </div>
      </h1>
      <div className="overflow-hidden">
        <motion.h2
          variants={fadeDelay}
          className="text-base lg:text-lg font-normal mt-6 dark:text-animo-lightgrey text-animo-darkgrey"
        >
          Experience a world where self-sovereign identity is the standard.
        </motion.h2>
      </div>
      <div className="flex flex-row justify-start text-base sxl:text-lg  font-normal mt-6">
        <motion.button
          data-cy="try-demo-button"
          variants={fadeDelay}
          whileHover={buttonHover}
          className="bg-animo-green dark:bg-animo-white text-animo-white dark:text-animo-black py-3 px-5 rounded-lg font-semibold shadow-sm dark:shadow-none select-none "
          onClick={handleStart}
        >
          Try demo &nbsp;
          <FiArrowRight className="inline h-6 pb-1" />
        </motion.button>
        <a href="https://www.canada.ca/en/revenue-agency.html" target="_blank">
          <motion.button
            variants={fadeDelay}
            whileHover={buttonHover}
            className="bg-white dark:bg-black text-black dark:text-white py-3 px-5 ml-4 rounded-lg font-semibold shadow-sm dark:shadow-none select-none "
          >
            <p className="inline">Get to know us &nbsp;</p>
            <FiExternalLink className="inline h-6 pb-1" />
          </motion.button>
        </a>
      </div>
    </motion.div>
  )

  return (
    <motion.div
      className="flex flex-col md:flex-row dark:text-white flex-grow"
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {isMobile ? renderMobileTitle : renderDesktopTitle}
      <div className="flex w-full md:w-1/3 lg:w-2/5 select-none">
        <img src={darkMode ? homeIllustrationDark : homeIllustrationLight} alt="animo-phone-light" />
      </div>
    </motion.div>
  )
}
