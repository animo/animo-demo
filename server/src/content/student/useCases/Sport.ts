import type { UseCase } from '../../types'

import { v4 as uuid } from 'uuid'

import { StepType } from '../../types'

const URL = '/public/student/useCases/sport'

const date = new Date()
date.setFullYear(date.getFullYear() + 1)
const nextYear = Number(date.toISOString().replace('-', '').split('T')[0].replace('-', ''))

export const Sport: UseCase = {
  slug: 'sport',
  card: {
    title: 'Get your free gym membership',
    image: `${URL}/card-sport.svg`,
    description: `Students can apply for a free gym membership. Let's use our credentials to get in shape!`,
  },

  stepper: [
    {
      id: uuid(),
      name: 'Connect with the gym',
      description: 'Setup a secure connection with the gym.',
      steps: 1,
      section: 1,
    },
    {
      id: uuid(),
      name: 'Share your information',
      description: 'Prove to the gym you are a student.',
      steps: 3,
      section: 1,
    },
    {
      id: uuid(),
      name: 'Obtain your membership',
      description: 'Accept your free gym membership',
      steps: 5,
      section: 1,
    },
  ],

  sections: [
    {
      id: uuid(),
      entity: {
        name: 'Pump IT Gym',
        icon: `${URL}/logo-gym.png`,
        imageUrl: 'https://i.imgur.com/CbkUgpH.png',
      },
      colors: {
        primary: '#92E3A9',
        secondary: '#C9EDD3',
      },
      requestedCredentials: [
        {
          id: uuid(),
          name: 'CRA ID Card',
          icon: '/public/student/icon-student.svg',
          properties: ['Name', 'Date of birth'],
        },
        {
          id: uuid(),
          name: 'University Card',
          icon: '/public/student/useCases/school/icon-university-card.png',
          properties: ['Valid until'],
        },
      ],
      issueCredentials: [
        {
          id: uuid(),
          name: 'Gym Membership',
          attributes: [
            { name: 'Name', value: 'Jan van Dalen' },
            { name: 'Date of birth', value: '19990101' },
            { name: 'Valid until', value: nextYear.toString() },
          ],
          icon: `${URL}/icon-membership.png`,
        },
      ],
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          image: `${URL}/card-sport.svg`,
          title: 'Join the gym',
          description: `You heard that the local gym offers free memberships to students if they prove they've been enrolled. That should be easy with your university pass. Let's see!`,
        },
        {
          id: uuid(),
          type: StepType.CONNECTION,
          title: 'Connect with the gym',
          description:
            'Just scan the QR-code to connect. The gym has connection details available online, as well as at the registration desk.',
        },
        {
          id: uuid(),
          type: StepType.INFO,
          image: `${URL}/sport-fill-out.svg`,
          title: 'Prove you are a student',
          description: `Using this secure connection, you can prove you're a student to get the membership for free, using your verifiable credentials.`,
        },
        {
          id: uuid(),
          type: StepType.PROOF,
          title: 'Share your information',
          description: `Grab your wallet, you've received a request for some information!`,
          requestOptions: {
            name: 'Pump IT Gym Request',
            comment: 'Pump IT Gym would like some of your personal information.',
          },
        },
        {
          id: uuid(),
          type: StepType.INFO,
          image: `${URL}/sport-happy.svg`,
          title: `You're eligible for the free membership!`,
          description: `Great, you can get fit without breaking the bank, now get ready to receive your membership credential. You'll store it in your wallet, with the rest of your credentials.`,
        },

        {
          id: uuid(),
          type: StepType.CREDENTIAL,
          title: 'Obtain your membership',
          description: `Open your wallet, and accept your new gym membership.`,
        },
        {
          id: uuid(),
          type: StepType.END,
          title: `Congratulations, you did it!`,
          description: 'Great job on finishing this use case. These are the steps you took.',
          endStepper: [
            {
              id: uuid(),
              title: `You connected with the gym.`,
              description: `This secure channel can be used for all of your communication with the gym.`,
              image: `${URL}/card-sport.svg`,
            },
            {
              id: uuid(),
              title: `You showed your university pass`,
              description: `This proves you are eligible for the free membership.`,
              image: `${URL}/sport-fill-out.svg`,
            },
            {
              id: uuid(),
              title: `Ready to work out!`,
              description: `Meet people and work out on campus!`,
              image: `${URL}/sport-pilates.svg`,
            },
          ],
        },
      ],
    },
  ],
}
