import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/navigation'

import { page } from '@/FramerAnimations'
import { Modal } from '@/components/Modal'
import { SmallButtonText } from '@/components/SmallButtonText'
import { useTitle } from '@/hooks/useTitle'
import { useCurrentCharacter, usePreferences } from '@/contexts/AppStateContext'
import { useUseCasesByCharacter } from '@/hooks/useUseCases'
import { trackEvent } from '@/utils/Analytics'
import { Footer } from '../landing/components/Footer'
import { NavBar } from '../landing/components/Navbar'
import { DashboardCard } from './components/DashboardCard'
import { DemoCompletedModal } from './components/DemoCompletedModal'
import { ProfileCard } from './components/ProfileCard'
import { UseCaseContainer } from './components/UseCaseContainer'

export const DashboardPage: React.FC = () => {
  useTitle('Dashboard | Animo Self-Sovereign Identity Demo')

  const router = useRouter()
  const { completedUseCaseSlugs, demoCompleted, setDemoCompleted } = usePreferences()
  const { currentCharacter } = useCurrentCharacter()
  
  // Use React Query to fetch use cases for the current character
  const { data: useCases = [], isLoading } = useUseCasesByCharacter(
    currentCharacter?.id || ''
  )

  useEffect(() => {
    if (completedUseCaseSlugs.length !== 0 && completedUseCaseSlugs.length === useCases.length) {
      setDemoCompleted()
    }
  }, [completedUseCaseSlugs, useCases, setDemoCompleted])

  const isMobile = useMediaQuery({ query: '(max-width: 976px)' })

  const dashboardCard = (
    <DashboardCard
      title="Get to know Animo."
      info="We’ve a lot more going on than just this (awesome) demo and we would love to discuss self-sovereign identity with you. Get in touch!"
      button={
        <SmallButtonText text="CONTACT" onClick={() => window.open('https://animo.id', '_blank')} disabled={false} />
      }
    />
  )

  const ERROR_TITLE = `Woops...`
  const ERROR_DESCRIPTION = `That's not gone well. Please restart the demo.`
  const routeError = () => {
    router.push('/demo')
    // TODO: Reset demo state
  }

  const completeDemo = () => {
    router.push('/')
    // TODO: Reset demo state

    if (currentCharacter)
      trackEvent('demo-character-completed', {
        props: {
          character: currentCharacter.name,
        },
      })
  }

  return (
    <motion.div
      className="container flex flex-col h-screen justify-between"
      variants={page}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="mx-8 my-4">
        <NavBar />
      </div>
      {currentCharacter ? (
        <>
          <div className="flex flex-col lg:flex-row mb-auto">
            <div className="w-full lg:w-2/3 order-last lg:order-first">
              <UseCaseContainer
                completedUseCaseSlugs={completedUseCaseSlugs}
                useCases={useCases}
              />
              {isMobile && <div className="m-4">{dashboardCard}</div>}
            </div>
            <div className="flex flex-1 flex-col p-2 mx-2 dark:text-white">
              <ProfileCard currentCharacter={currentCharacter} />
              {!isMobile && dashboardCard}
            </div>
          </div>
        </>
      ) : (
        <AnimatePresence mode="wait" onExitComplete={() => null}>
          <Modal title={ERROR_TITLE} description={ERROR_DESCRIPTION} onOk={routeError} />
        </AnimatePresence>
      )}
      {demoCompleted && <DemoCompletedModal action={completeDemo} />}
      <Footer />
    </motion.div>
  )
}
