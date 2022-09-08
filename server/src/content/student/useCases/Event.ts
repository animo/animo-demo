import type { UseCase } from '../../types'

import { v4 as uuid } from 'uuid'

import { StepType } from '../../types'

const URL = '/public/student/useCases/rwot'

export const Event: UseCase = {
  slug: 'attend-event',
  card: {
    title: 'Attend Rebooting the Web of Trust (RWOT)',
    image: `${URL}/rwot-main.svg`,
    description: `Wooooot! RWOT is coming to The Hague this year. Lets enter the event using a verifiable credential.`,
  },

  stepper: [
    {
      id: uuid(),
      name: 'Get your digital RWOT Pass',
      description: 'First up you need to signup for RWOT online.',
      steps: 4,
      section: 1,
    },
    {
      id: uuid(),
      name: 'Receive your credential',
      description: 'Obtain your RWOT Pass as a credential',
      steps: 4,
      section: 1,
    },
    {
      id: uuid(),
      name: 'Enter the event with your RWOT Pass',
      description: 'After receiving your ticket, you are ready to enter the conference.',
      steps: 7,
      section: 1,
    },
  ],

  sections: [
    {
      id: uuid(),
      entity: {
        name: 'RWOT',
        icon: `${URL}/rwot-logo.png`,
        imageUrl: 'https://i.imgur.com/2ni3W0C.png',
      },
      colors: {
        primary: '#0186FF',
        secondary: '#bbdcf9',
      },
      requestedCredentials: [
        {
          id: uuid(),
          name: 'Animo ID Card',
          icon: '/public/student/icon-student.svg',
          properties: ['Name', 'Nationality'],
        },
      ],
      issueCredentials: [
        {
          id: uuid(),
          name: 'RWOT Pass',
          properties: [{ name: 'Name' }, { name: 'Nationality' }],
          icon: `${URL}/icon-conference-pass.svg`,
        },
      ],
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          image: `${URL}/rwot-main.svg`,
          title: 'Attend Rebooting the Web of Trust (RWOT)',
          description: `It's time for the 11th edition of RWOT! This is one of the biggest digital identity events in the world happening every year. Time to get a ticket, enter the conference and get to work!`,
        },
        {
          id: uuid(),
          type: StepType.CONNECTION,
          image: `${URL}/rwot-main.svg`,
          title: 'Scan the QR-code to sign up for the conference.',
          description:
            'You got a reminder in your inbox to signup for the new edition of RWOT. To sign up, connect by scanning the QR code.',
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: `RWOT needs some information`,
          image: `${URL}/rwot-info-secure.svg`,
          description: `You now have a secure connection. Using this connection, you can share some personal information that is needed to complete the registration.`,
        },
        {
          id: uuid(),
          type: StepType.PROOF,
          title: 'Accept the request from RWOT',
          description: `Grab your wallet, you've received a request for some information! To finish the registration process, share the information by accepting the request. `,
          requestOptions: {
            name: 'Information for your RWOT Pass',
            comment: 'We would like some personal information for your RWOT Pass.',
          },
        },
        {
          id: uuid(),
          type: StepType.CREDENTIAL,
          title: 'Accept your RWOT Pass',
          description: `Open your wallet, and accept your new RWOT pass. You can use it to prove that you have access.`,
          useProof: true,
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: `Hi! Welcome to RWOT!`,
          description: `The time has come and RWOT is here! It's all sold out and you will need to show your ticket to get in.`,
          image: `${URL}/rwot-line-waiting.svg`,
        },
        {
          id: uuid(),
          type: StepType.PROOF,
          title: 'We would like to see your RWOT pass',
          requestOptions: {
            name: 'Valid RWOT Pass',
            comment: 'We would like to see your RWOT Pass.',
          },
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: `You've arrived inside at RWOT!`,
          description: `Checking your RWOT pass was a breeze! What are you waiting for? Get creative and start collaborating!`,
          image: `${URL}/rwot-collab2.svg`,
        },
        {
          id: uuid(),
          type: StepType.END,
          title: 'Congratulations, you did it!',
          description: 'Great job on finishing this use case. These are the steps you took.',
          endStepper: [
            {
              id: uuid(),
              title: 'You connected with RWOT',
              description: 'This secure connection is used for all of your communication with RWOT.',
              image: `${URL}/rwot-info-secure.svg`,
            },
            {
              id: uuid(),
              title: 'You entered the venue',
              description: 'By proving you have a ticket you got access to the venue.',
              image: `${URL}/rwot-line-waiting.svg`,
            },
            {
              id: uuid(),
              title: 'You have changed the future',
              description:
                'You collaborated with people all over the world to build the future of decentralized identity.',
              image: `${URL}/rwot-collab2.svg`,
            },
          ],
        },
      ],
    },
  ],
}
