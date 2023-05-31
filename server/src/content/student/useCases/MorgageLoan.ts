import type { UseCase } from '../../types'

import { v4 as uuid } from 'uuid'

import { StepType } from '../../types'

const URL = '/public/student/useCases/noa'

export const MorgageLoan: UseCase = {
  slug: 'loan',
  card: {
    title: 'Get a morgage loan approved',
    image: `${URL}/card-school.svg`,
    description: `Taxpayers might be eligible to a get a morgage loan approved from a bank. Let's use CRA's NOA credential to get a loan`
  },

  stepper: [
    {
      id: uuid(),
      name: `Connect with the Bank`,
      description: `Setup a secure connection with the Bank.`,
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
      name: 'Receive your morgage loan approval ',
      description: 'Accept your new loan credential that is issued by the Bank.',
      steps: 7,
      section: 1,
    },
  ],

  sections: [
    {
      id: uuid(),
      entity: {
        name: 'ABC Bank',
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
          name: 'NOA Card',
          icon: '/public/student/icon-student.svg',
          properties: ['Name','Date of birth','Sin','Net Income'],
        },
      ],
      issueCredentials: [
        {
          id: uuid(),
          name: 'Morgage Loan',
          properties: [{ name: 'Name' },{ name: 'Date of birth' },{ name: 'Sin' },{ name: 'Net Income' }],
          attributes: [
            { name: 'Corporation', value:'ABC Bank'},
            { name: 'Approved Loan Amount', value: '200000' },
          ],
          icon: `${URL}/icon-university-card.png`,
        },
      ],
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          image: `${URL}/card-school.svg`,
          title: 'Get your Morgage Loan Approval.',
          description: `Few clicks away to get your Loan approved`,
        },
        {
          id: uuid(),
          type: StepType.CONNECTION,
          title: 'Scan the QR-code to connect with the bank.',
          description: `You're ready to submit your credentials on their website. Scan the QR-Code to set up a secure connection with the bank. The bank connection will appear in your wallet!`,
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
          title: 'The bank wants some information.',
          description: `Grab your wallet, you've received a request for some information! To finish the application process, share the information by accepting the request. `,
          requestOptions: {
            name: 'Morgage Loan Approval Request',
            comment: 'The Bank would like some of your personal information.',
          },
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: `You've submitted your application.`,
          description: `Your application  is being processed by the bank. This shouldn't take too long, because all the data you've shared can be verified in seconds`,
          image: `${URL}/student-secure.svg`,
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: 'You got in!',
          description: `Congrats! The bank has verified your credentials. Now the bank will issue you a Loan credential which can be used to buy a home `,
          image: `${URL}/student-accepted.svg`,
        },
        {
          id: uuid(),
          type: StepType.CREDENTIAL,
          title: `The bank issues you your Loan credential`,
          description: `Open your wallet, and accept your new Loan credential. You can use to prove your income at various banks.`,
          requestOptions: {
            name: 'Morgage Loan',
            comment: 'Here is your Loan credential.',
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
              title: `You connected with the bank`,
              description: 'This secure channel can be used for all of your communication with the bank.',
              image: `${URL}/student-on-laptop.svg`,
            },
            {
              id: uuid(),
              title: 'You safely presented your data',
              description: `Without showing all of your data, you successfully applied by accepting the bank's request.`,
              image: `${URL}/student-secure.svg`,
            },
            {
              id: uuid(),
              title: 'You got in!',
              description: `Your application was accepted and the bank issued you your Loan credential. This credential is now safely stored in your digital wallet.`,
              image: `${URL}/student-accepted.svg`,
            },
          ],
        },
      ],
    },
  ],
}
