import type { Step } from '../../../slices/types'

import { motion } from 'framer-motion'
import Plausible from 'plausible-tracker'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useNavigate, useParams } from 'react-router-dom'

import { fadeExit } from '../../../FramerAnimations'
import { Button } from '../../../components/Button'
import { useAppDispatch } from '../../../hooks/hooks'
import { useCaseCompleted } from '../../../slices/preferences/preferencesSlice'
import { prependApiUrl } from '../../../utils/Url'

const { trackEvent } = Plausible()

export interface Props {
  step: Step
}

export const EndContainer: React.FC<Props> = ({ step }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [completed, setCompleted] = useState(false)
  const { slug } = useParams()
  const isMobile = useMediaQuery({ query: '(max-width: 976px)' })
  const style = isMobile ? { minHeight: '85vh' } : { maxHeight: '940px' }

  useEffect(() => {
    if (completed && slug) {
      dispatch(useCaseCompleted(slug))
      dispatch({ type: 'clearUseCase' })
      navigate('/dashboard')
      trackEvent('use-case-completed', {
        props: {
          useCase: slug,
        },
      })
    }
  }, [completed, dispatch, slug])

  const renderEndSteps = step.endStepper?.map((item, idx) => {
    return (
      <div key={item.id} className="flex flex-col m-4 md:w-1/3 items-center">
        <img className="flex-1 h-48 w-48 mx-4 xl:mx-8 pb-4" src={prependApiUrl(item.image)} alt={item.title} />
        <div className="flex flex-1 flex-col ">
          <div className="flex flex-row ">
            <h2 className="text-lg font-bold mt-2">
              {idx + 1}. {item.title}
            </h2>
          </div>
          <div className="flex flex-col my-4">
            <p className="text-base ">{item.description}</p>
          </div>
        </div>
      </div>
    )
  })

  return (
    <motion.div
      variants={fadeExit}
      initial="hidden"
      animate="show"
      exit="exit"
      className="flex flex-col bg-white dark:bg-animo-darkgrey rounded-lg p-6 md:p-12 xl:p-16 my-8 h-max min-h-full md:h-5/6 shadow-sm "
      style={style}
      data-cy="end-container"
    >
      <div className="flex flex-col">
        <h1 className="text-4xl	font-bold my-4">{step.title}</h1>
        <p>{step.description}</p>
      </div>
      <div className="flex flex-col md:flex-row m-auto ">{renderEndSteps}</div>
      <div className="flex items-end self-end ">
        <Button text="COMPLETE" onClick={() => setCompleted(true)} />
      </div>
    </motion.div>
  )
}
