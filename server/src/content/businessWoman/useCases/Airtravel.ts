import type { UseCase } from '../../types'

import { v4 as uuid } from 'uuid'

import { StepType } from '../../types'

const URL = '/public/businesswoman/useCases/airtravel/'

export const AirTravel: UseCase = {
  slug: 'air-travel',
  card: {
    title: 'Time for some rest',
    image: `${URL}/airtravel-card.svg`,
    description: `Work hard, play harder. From time to time you need a vacation. Let's book a flight to a nice sunny place to take some time off.`,
  },

  stepper: [
    {
      id: uuid(),
      name: 'Select your destination.',
      description: 'Browse the internet and find a flight.',
      steps: 1,
      section: 1,
    },
    {
      id: uuid(),
      name: 'Connect with Sunrise Airways.',
      description: 'Setup a connection with Sunrise Airways to book your flight.',
      steps: 2,
      section: 1,
    },
    {
      id: uuid(),
      name: 'Receive your airplane ticket.',
      description: 'Share your personal information and receive your flight details.',
      steps: 5,
      section: 1,
    },
  ],

  sections: [
    {
      id: uuid(),
      entity: {
        name: 'Sunrise Airways',
        icon: `${URL}/icon-airline.png`,
        imageUrl: 'https://i.imgur.com/1q1VIlN.png',
      },
      colors: {
        primary: '#EA67A8',
        secondary: '#EBC3D7',
      },
      requestedCredentials: [
        {
          id: uuid(),
          name: 'CRA ID Card',
          icon: `/public/businesswoman/icon-businesswoman.svg`,
          properties: ['Name', 'Date of birth', 'Nationality'],
        },
        {
          id: uuid(),
          name: 'Credit card',
          icon: `/public/businesswoman/icon-creditcard.png`,
          properties: ['Security code', 'Card number', 'Valid until'],
        },
      ],
      issueCredentials: [
        {
          id: uuid(),
          name: 'Airplane Ticket',
          attributes: [
            { name: 'Airline', value: 'Sunrise Airways' },
            { name: 'Class', value: 'Business' },
            { name: 'Seat', value: '13A' },
            { name: 'Passenger', value: 'Joyce Brown' },
          ],
          icon: `${URL}/icon-ticket.png`,
        },
      ],
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          image: `${URL}/airtravel-card.svg`,
          title: 'Time for some rest.',
          description: `You're ready for a nice, relaxing vacation. Work hard, play hard, right? Let's book a flight to a nice sunny country using verifiable credentials.`,
        },
        {
          id: uuid(),
          type: StepType.CONNECTION,
          title: 'Connect with Sunrise Airways',
          description: `You've been browsing for a vacation with sea, sun and sand and found a great flight to Hawaii on the website of Sunrise Airways. Use your wallet to make a connection. `,
        },
        {
          id: uuid(),
          type: StepType.INFO,
          image: `${URL}/airtravel-details.svg`,
          title: 'Sunrise Airways wants some information',
          description: `You now have a secure connection with Sunrise Airways and are ready to book your vacation. Use the credentials in your wallet to finish the reservation process.`,
        },
        {
          id: uuid(),
          type: StepType.PROOF,
          title: 'Accept the request from Sunrise Airways',
          description: `Open your wallet to share information with Sunrise Airways, using your secure connection.`,
          requestOptions: {
            name: 'Flight information',
            comment: `Sunrise Airways wants to know your personal and billing information.`,
          },
        },
        {
          id: uuid(),
          type: StepType.INFO,
          image: `${URL}/airtravel-secure.svg`,
          title: 'Your flight has been booked!',
          description: `Great! You've booked your ticket. Before you go pack your bags, Sunrise Airways will first issue you a ticket. `,
        },
        {
          id: uuid(),
          type: StepType.CREDENTIAL,
          title: 'Get your ticket to Hawaii',
          description: `Look in your wallet to accept your ticket, you can use this ticket to go on vacation to Hawaii.`,
          image: `${URL}/airtravel-notification.svg`,
          useProof: false,
        },
        {
          id: uuid(),
          type: StepType.INFO,
          image: `${URL}/airtravel-beach.svg`,
          title: `Time to relax!`,
          description: `Leave your laptop at home because it is time to work on nothing but your tan. `,
        },
        {
          id: uuid(),
          type: StepType.END,
          title: 'Congratulations!',
          description: 'Great job on finishing this use case. These are the steps you took.',
          endStepper: [
            {
              id: uuid(),
              title: 'You connected with Sunrise Airways',
              description: 'This secure connection is used for all of your communication with Sunrise Airways.',
              image: `${URL}/airtravel-laptop.svg`,
            },
            {
              id: uuid(),
              title: `You shared your personal and billing information`,
              description: 'By accepting the request you safely shared your data with Sunrise Airways.',
              image: `${URL}/airtravel-secure.svg`,
            },
            {
              id: uuid(),
              title: 'You obtained your boarding pass, right in your digital wallet.',
              description: 'This is now safely stored in your wallet.',
              image: `${URL}/airtravel-beach.svg`,
            },
          ],
        },
      ],
    },
  ],
}
