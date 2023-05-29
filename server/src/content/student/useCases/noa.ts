import type { UseCase } from '../../types'

import { v4 as uuid } from 'uuid'

import { StepType } from '../../types'

const URL = '/public/student/useCases/noa'

export const Noa: UseCase = {
  slug: 'noa',
  card: {
    title: 'Get your Notice of Assessment',
    image: `${URL}/card-school.svg`,
    description: `Your notice of assessment (NOA) is an evaluation of your tax return that the Canada Revenue Agency sends you every year after you file your tax return.`
  },

  stepper: [
    {
      id: uuid(),
      name: `Connect with the CRA`,
      description: `Setup a secure connection with the CRA.`,
      steps: 1,
      section: 1,
    },
    {
      id: uuid(),
      name: 'Submit your application',
      description: 'Use the connection to submit your credentials.',
      steps: 4,
      section: 1,
    },
    {
      id: uuid(),
      name: 'Receive your student pass',
      description: 'Accept your new noa credential that is issued by the CRA.',
      steps: 7,
      section: 1,
    },
  ],

  sections: [
    {
      id: uuid(),
      entity: {
        name: 'Canada Revenue Agency',
        icon: `${URL}/logo-university.png`,
        imageUrl: 'https://i.imgur.com/KPrshWf.png',
      },
      colors: {
        primary: '#4686C6',
        secondary: '#c4dbf3',
      },
      requestedCredentials: [
        {
          id: uuid(),
          name: 'CRA ID Card',
          icon: '/public/student/icon-student.svg',
          properties: ['Name', 'Date of birth'],
        },
      ],
      issueCredentials: [
        {
          id: uuid(),
          name: 'NOA Card',
          properties: [{ name: 'Name' }, { name: 'Date of birth' }],
          attributes: [
            { name: 'Corporation', value: 'Canada Revenue Agency' },
            { name: 'Faculty', value: 'Administration' },
            { name: 'Sin', value: '123456789' },
            { name: 'Date Issued', value: '20230331' },
            { name: 'Net Income', value: '50000' },
          ],
          icon: `${URL}/icon-university-card.png`,
        },
      ],
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          image: `${URL}/card-school.svg`,
          title: 'Get your Notice of Assessment(NOA).',
          description: `Few clicks away to get your NOA`,
        },
        {
          id: uuid(),
          type: StepType.CONNECTION,
          title: 'Scan the QR-code to connect with the agency.',
          description: `You're ready to submit your credentials on their website. Scan the QR-Code to set up a secure connection with the agency. The agency connection will appear in your wallet!`,
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: 'You now have a secure connection.',
          description: `Using this connection, you are going to share some personal information that is needed to complete the application.`,
          image: `${URL}/student-fill-out.svg`,
        },
        {
          id: uuid(),
          type: StepType.PROOF,
          title: 'The agency wants some information.',
          description: `Grab your wallet, you've received a request for some information! To finish the application process, share the information by accepting the request. `,
          requestOptions: {
            name: 'Notice of Assessment Request',
            comment: 'The CRA would like some of your personal information.',
          },
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: `You've submitted your application.`,
          description: `Your application  is being processed by the agency. This shouldn't take too long, because all the data you've shared can be verified in seconds`,
          image: `${URL}/student-secure.svg`,
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: 'You got in!',
          description: `Congrats! The agency has verified your credentials. Now the agency will issue you a NOA credential which can be used to prove your Net Icome `,
          image: `${URL}/student-accepted.svg`,
        },
        {
          id: uuid(),
          type: StepType.CREDENTIAL,
          title: `The agency issues you your NOA credential`,
          description: `Open your wallet, and accept your new NOA credential. You can use to prove your income at various banks.`,
          requestOptions: {
            name: 'Notice of Assessment',
            comment: 'Here is your NOA credential.',
          },
          useProof: true,
        },
        {
          id: uuid(),
          type: StepType.END,
          title: 'Congratulations, you did it!',
          description: 'Great job on finishing this use case. These are the steps you took.',
          endStepper: [
            {
              id: uuid(),
              title: `You connected with the agency`,
              description: 'This secure channel can be used for all of your communication with the agency.',
              image: `${URL}/student-on-laptop.svg`,
            },
            {
              id: uuid(),
              title: 'You safely presented your data',
              description: `Without showing all of your data, you successfully applied by accepting the agency's request.`,
              image: `${URL}/student-secure.svg`,
            },
            {
              id: uuid(),
              title: 'You got in!',
              description: `Your application was accepted and the agency issued you your NOA credential. This credential is now safely stored in your digital wallet.`,
              image: `${URL}/student-accepted.svg`,
            },
          ],
        },
      ],
    },
  ],
}
