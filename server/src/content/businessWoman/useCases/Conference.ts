import type { UseCase } from '../../types'

import { v4 as uuid } from 'uuid'

import { StepType } from '../../types'

const URL = '/public/businesswoman/useCases/conference'
const year = new Date().getFullYear()
export const Conference: UseCase = {
  slug: 'conference',

  card: {
    title: 'Attend a conference',
    image: `${URL}/conference-card.svg`,
    description: `TechCon ${year.toString()} is right around the corner! Let's get our conference pass and meet some new people!`,
  },

  stepper: [
    {
      id: uuid(),
      name: `Get your TechCon ${year.toString()} Pass`,
      description: 'First up you need to signup for TechCon online.',
      section: 1,
      steps: 5,
    },
    {
      id: uuid(),
      name: 'Enter TechCon with your TechCon Pass',
      description: 'After receiving your ticket, you are ready to enter the conference!',
      section: 2,
      steps: 3,
    },
    {
      id: uuid(),
      name: 'Connect with a fellow conference visitor',
      description: 'Lastly, you want to connect with a fellow conference visitor.',
      section: 3,
      steps: 4,
    },
  ],

  sections: [
    {
      id: uuid(),
      entity: {
        name: `TechCon ${year.toString()}`,
        icon: `${URL}/logo-conference.png`,
        imageUrl: 'https://i.imgur.com/vyJZGpL.png',
      },
      colors: {
        primary: '#43BA8F',
        secondary: '#C7EADD',
      },
      requestedCredentials: [
        {
          id: uuid(),
          name: 'CRA ID Card',
          icon: `/public/businesswoman/icon-businesswoman.svg`,
          properties: ['Name', 'Nationality'],
        },
      ],
      issueCredentials: [
        {
          id: uuid(),
          name: 'Conference Pass',
          properties: [{ name: 'Name' }, { name: 'Nationality' }],
          icon: `${URL}/icon-conference-pass.svg`,
        },
      ],
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          image: `${URL}/conference-card.svg`,
          title: 'Attending a Conference',
          description: `It's time for TechCon ${year.toString()}! This is one of the biggest Tech Conferences in the world happening every year. Time to get a ticket, enter the conference and meet some new people using verifiable credentials.`,
        },
        {
          id: uuid(),
          type: StepType.CONNECTION,
          title: 'Scan the QR-code to sign up for the conference.',
          description:
            'You got a reminder in your inbox to signup for the new edition of TechCon. To sign up, connect by scanning the QR code.',
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: `TechCon needs some information`,
          image: `${URL}/conference-safe.svg`,
          description: `You now have a secure connection. Using this connection, you can share some personal information that is needed to complete the registration.`,
        },
        {
          id: uuid(),
          type: StepType.PROOF,
          title: 'Accept the request from TechCon',
          description: `Grab your wallet, you've received a request for some information! To finish the registration process, share the information by accepting the request. `,
          requestOptions: {
            name: 'Conference Pass information',
            comment: 'We would like some personal information for your TechCon Pass.',
          },
        },
        {
          id: uuid(),
          type: StepType.CREDENTIAL,
          title: 'Accept your conference pass',
          description: `Open your wallet, and accept your new conference pass. You can use it to prove that you have access.`,
          useProof: true,
        },
      ],
    },
    {
      id: uuid(),
      entity: {
        name: `TechCon ${year.toString()}`,
        icon: `${URL}/logo-conference.png`,
        imageUrl: 'https://i.imgur.com/vyJZGpL.png',
      },
      colors: {
        primary: '#43BA8F',
        secondary: '#C7EADD',
      },
      issueCredentials: [],
      requestedCredentials: [
        {
          id: uuid(),
          name: 'Conference Pass',
          icon: `${URL}/icon-conference-pass.svg`,
          properties: ['Name'],
        },
      ],
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          title: `Hi! Welcome to TechCon ${year.toString()}!`,
          description: `The time has come and TechCon ${year.toString()} is here! It's all sold out and you will need to show your ticket to get in.`,
          image: `${URL}/conference-line-waiting.svg`,
        },
        {
          id: uuid(),
          type: StepType.PROOF,
          title: 'We would like to see your conference pass',
          requestOptions: {
            name: 'Valid TechCon Pass',
            comment: 'We would like to see your TechCon Pass.',
          },
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: `You've arrived inside at TechCon ${year.toString()}`,
          description: `Checking your conference pass was a breeze, now you can get started and get connected!`,
          image: `${URL}/conference-card.svg`,
        },
      ],
    },
    {
      id: uuid(),
      entity: {
        name: 'Dave',
        icon: `${URL}/icon-dave.svg`,
        imageUrl: 'https://i.imgur.com/1XjxnZw.png',
      },
      colors: {
        primary: '#43BA8F',
        secondary: '#C7EADD',
      },
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          title: 'Networking',
          image: `${URL}/conference-share-information.svg`,
          description: `A conference is a great place to meet new people that you are interested in. You bump into Dave at a workshop, Dave is the founder of a new startup that is killing it in the self-sovereign identity space. Let's connect with him.`,
        },
        {
          id: uuid(),
          type: StepType.CONNECTION,
          title: 'Connect with Dave.',
          description: `Open your wallet and scan Dave's QR-code to add him to your list of connections to stay connected.`,
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: `Now you can chat!`,
          description: `Now that Dave has appeared in your connections, you can use this channel for all future contact and possible business dealings!`,
          image: `${URL}/conference-connected.svg`,
        },
        {
          id: uuid(),
          type: StepType.END,
          title: 'Congratulations, you did it!',
          description: 'Great job on finishing this use case. These are the steps you took.',
          endStepper: [
            {
              id: uuid(),
              title: 'You connected with TechCon',
              description: 'This secure connection is used for all of your communication with TechCon.',
              image: `${URL}/conference-line-waiting.svg`,
            },
            {
              id: uuid(),
              title: 'You entered the venue',
              description: 'By proving you have a ticket you got access to the venue.',
              image: `${URL}/conference-phone-notification.svg`,
            },
            {
              id: uuid(),
              title: 'You connected with Dave.',
              description: 'With this secure channel you can chat with Dave.',
              image: `${URL}/conference-share-information.svg`,
            },
          ],
        },
      ],
    },
  ],
}
