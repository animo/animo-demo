import type { UseCase } from '../../types'

import { v4 as uuid } from 'uuid'

import { StepType } from '../../types'

const URL = '/public/millennial/useCases/laptop'

const date = new Date()
const today = Number(date.toISOString().replace('-', '').split('T')[0].replace('-', ''))

export const Laptop: UseCase = {
  slug: 'buy-laptop',
  card: {
    title: `Let's buy a new laptop`,
    image: `${URL}/laptop-card.svg`,
    description:
      "It's time for a new laptop. Let's buy a nice one using verifiable credentials.",
  },
  stepper: [
    {
      id: uuid(),
      name: 'Find a new laptop',
      description: `Let's see what laptops are available.`,
      steps: 2,
      section: 1,
    },
    {
      id: uuid(),
      name: 'Make a purchase',
      description: 'We need to share our payment details.',
      steps: 6,
      section: 1,
    },
    {
      id: uuid(),
      name: 'Receive your invoice',
      description: 'Receive your invoice in you wallet.',
      steps: 7,
      section: 1,
    },
  ],

  sections: [
    {
      id: uuid(),
      entity: {
        name: `Pear Store`,
        icon: `${URL}/laptop-store-logo.png`,
        imageUrl: 'https://i.imgur.com/8qNXLha.png',
      },
      colors: {
        primary: '#5AAAE7',
        secondary: '#ACCEE9',
      },
      requestedCredentials: [
        {
          id: uuid(),
          name: 'Animo ID Card',
          icon: '/public/millennial/icon-millennial.svg',
          properties: ['Name', 'Street', 'City'],
        },
        {
          id: uuid(),
          name: 'Crypto Wallet',
          icon: '/public/millennial/icon-crypto-wallet.png',
          properties: ['Address'],
        },
      ],
      issueCredentials: [
        {
          id: uuid(),
          name: 'Laptop Invoice',
          attributes: [
            { name: 'Name', value: 'Karim Müller' },
            { name: 'Street', value: 'Dorfstrasse 23' },
            { name: 'City', value: 'Zürich' },
            { name: 'Store', value: 'Pear Store' },
            { name: 'Product', value: 'PearBook Pro' },
            { name: 'Price', value: '$1000' },
            { name: 'Date', value: today.toString() },
          ],
          icon: `${URL}/laptop-invoice.png`,
        },
      ],
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          image: `${URL}/laptop-card.svg`,
          title: `Let's buy a new laptop`,
          description: `It's time for an upgrade. The new PearBook Pro is out and it's a beauty. You can use verifiable credentials for day-to-day use cases like buying products. Let's see how it works.`,
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: 'You find a laptop online',
          description: `The new PearBook Pro seems to have everything you need, let's get it! `,
          image: `${URL}/laptop-searching.svg`,
        },
        {
          id: uuid(),
          type: StepType.CONNECTION,
          title: `Connect with the Pear store`,
          description: `Use your wallet to connect to the Pear store and make your purchase.`,
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: 'Pay for your new laptop',
          description: `The Pear store allows you to pay using your crypto wallet, cool! They'll also need to know some shipping information.`,
          image: `${URL}/laptop-paying.svg`,
        },
        {
          id: uuid(),
          type: StepType.PROOF,
          title: 'Share shipping information',
          description: `Open your wallet to accept the request for information.`,
          requestOptions: {
            name: `Pear information request`,
            comment: 'Pear would like some of your information.',
          },
        },
        {
          id: uuid(),
          type: StepType.CREDENTIAL,
          title: `Receive your invoice`,
          description: `If only shipping was as fast as using verifiable credentials. The last step is to receive and accept your invoice in your wallet. `,
          requestOptions: {
            name: 'Pear Store Invoice',
            comment: 'Here is your invoice.',
          },
        },
        {
          id: uuid(),
          type: StepType.END,
          title: 'Congratulations, you did it!',
          description: 'Great job on finishing this use case. These are the steps you took.',
          endStepper: [
            {
              id: uuid(),
              title: 'You picked a laptop',
              description: 'Selecting the laptop on the website of the Pear Store.',
              image: `${URL}/laptop-selected.svg`,
            },
            {
              id: uuid(),
              title: 'You safely presented your data',
              description: 'Without showing all of your data, you have successfully ordered the laptop.',
              image: `${URL}/laptop-paying.svg`,
            },
            {
              id: uuid(),
              title: `You received the invoice in your wallet`,
              description: `The secure connection can also be used as a direct communication channel if you have any problems with your purchase.`,
              image: `${URL}/laptop-happy.svg`,
            },
          ],
        },
      ],
    },
  ],
}
