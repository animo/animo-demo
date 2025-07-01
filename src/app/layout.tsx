import type { Metadata } from 'next'
import './globals.css'
import ClientApp from '@/components/ClientApp'

export const metadata: Metadata = {
  title: 'Demo | Animo Self-Sovereign Identity Demo',
  description: 'Experience a world where self-sovereign identity is the standard. This interactive demo will show you the power of digital, verifiable credentials.',
  keywords: 'SSI, Self-Sovereign Identity, Demo, Blockchain, Verifiable Credentials, Hyperledger, Aries, Framework, JavaScript',
  openGraph: {
    title: 'Demo | Animo Self-Sovereign Identity Demo',
    description: 'Experience a world where self-sovereign identity is the standard. This interactive demo will show you the power of digital, verifiable credentials.',
    url: 'https://demo.animo.id',
    type: 'website',
    images: [
      {
        url: '/seo-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Animo Demo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Demo | Animo Self-Sovereign Identity Demo',
    description: 'Experience a world where self-sovereign identity is the standard. This interactive demo will show you the power of digital, verifiable credentials.',
    images: ['/seo-logo.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon-light.ico" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#F5F5F4" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#202223" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="font-montserrat min-h-screen min-w-min bg-animo-white dark:bg-animo-black transition duration-500 ease-in-out">
        <ClientApp>{children}</ClientApp>
      </body>
    </html>
  )
}