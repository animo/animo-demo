import type { UseCase } from '../../types'

import { v4 as uuid } from 'uuid'

import { StepType } from '../../types'

const URL = '/public/student/useCases/school'

export const School: UseCase = {
  slug: 'school',
  card: {
    title: 'Enroll into law school',
    image: `${URL}/card-school.svg`,
    description: `Let's enroll into university and get our student pass using the power of verifiable credentials.`,
  },

  stepper: [
    {
      id: uuid(),
      name: `Apply on the University's website`,
      description: `Browse the University website and make your choice.`,
      steps: 1,
      section: 1,
    },
    {
      id: uuid(),
      name: 'Submit your application',
      description: 'Connect with the University to submit your application.',
      steps: 6,
      section: 1,
    },
    {
      id: uuid(),
      name: 'Receive your student pass',
      description: 'Accept your new Student pass that is issued by the University.',
      steps: 8,
      section: 1,
    },
  ],

  sections: [
    {
      id: uuid(),
      entity: {
        name: 'University of Law',
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
          name: 'Animo ID Card',
          icon: '/public/student/icon-student.svg',
          properties: ['Name', 'Date of birth'],
        },
      ],
      issueCredentials: [
        {
          id: uuid(),
          name: 'University Card',
          properties: [{ name: 'Name' }, { name: 'Date of birth' }],
          attributes: [
            { name: 'University', value: 'University of Law' },
            { name: 'Faculty', value: 'Law' },
            { name: 'StudentID', value: '121098' },
            { name: 'Valid until', value: '20230831' },
          ],
          icon: `${URL}/icon-university-card.png`,
        },
      ],
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          image: `${URL}/card-school.svg`,
          title: 'Enroll into law school.',
          description: `You are ready to kickstart your career in Law and found a great university not far from your hometown. The university supports the use of verifiable credentials, so enrolling should be easy. Let's try it!`,
        },
        {
          id: uuid(),
          type: StepType.CONNECTION,
          title: 'Scan the QR-code to connect with the university.',
          description: `You're ready to submit your application  on their website. Scan the QR-Code to set up a secure connection with the university. The university connection will appear in your wallet!`,
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
          title: 'The university wants some information.',
          description: `Grab your wallet, you've received a request for some information! To finish the application process, share the information by accepting the request. `,
          requestOptions: {
            name: 'University of Law Request',
            comment: 'The university would like some of your personal information.',
          },
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: `You've submitted your application.`,
          description: `Your application  is being processed by the University. This shouldn't take too long, because all the data you've shared can be verified in seconds`,
          image: `${URL}/student-secure.svg`,
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: 'You got in!',
          description: `Congrats! The university accepted your application. Before you go tell your mom, the university will first issue you a student pass. `,
          image: `${URL}/student-accepted.svg`,
        },
        {
          id: uuid(),
          type: StepType.CREDENTIAL,
          title: `The university issues you your student pass.`,
          description: `Open your wallet, and accept your new student pass. You can use this pass to access the university's facilities and obtain some great student discounts.`,
          requestOptions: {
            name: 'Student pass',
            comment: 'Here is your student pass.',
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
              title: `You connected with the university`,
              description: 'This secure channel can be used for all of your communication with the university.',
              image: `${URL}/student-on-laptop.svg`,
            },
            {
              id: uuid(),
              title: 'You safely presented your data',
              description:
                `Without showing all of your data, you successfully applied by accepting the university's request.`,
              image: `${URL}/student-secure.svg`,
            },
            {
              id: uuid(),
              title: 'You got in!',
              description: `Your application was accepted and the university issued you your Student pass. This pass is now safely stored in your digital wallet.`,
              image: `${URL}/student-accepted.svg`,
            },
          ],
        },
      ],
    },
  ],
}
