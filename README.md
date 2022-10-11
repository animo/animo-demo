<p align="center">
  <br />
<img src="https://i.imgur.com/m6bVqCY.png" alt="screenshot-demo" height="600px"/>

</p>

<h1 align="center"><b>Animo Self-Sovereign Identity Demo</b></h1>
<div align="center">
  
[![Continuous Deployment](https://github.com/animo/animo-demo/actions/workflows/continuous-deployment.yml/badge.svg)](https://github.com/animo/animo-demo/actions/workflows/continuous-deployment.yml)
    <a
    href="https://raw.githubusercontent.com/hyperledger/aries-framework-javascript/main/LICENSE"
    ><img
      alt="License"
      src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"
  /></a>
  [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)
 
</div>

## ✨ Hi there!

Welcome to the repository of Animo's Self-Sovereign identity demo. This interactive app demonstrates the use of verifiable credentials. This demo is built using [Aries Framework Javascript (AFJ)](https://github.com/hyperledger/aries-framework-javascript). AFJ is a framework written in TypeScript for building SSI Agents and DIDComm services. This demo uses the REST API, which is part of the [Aries Framework JavaScript Extensions](https://github.com/hyperledger/aries-framework-javascript-ext) repository.

## 🛠️ Usage

### Prerequisites

- [NodeJS](https://nodejs.org/en/) v16.X.X - Other versions may work, not tested
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Git](https://git-scm.com/downloads) - You probably already have this

### 🖥 Client

Copy the `.env.example` file to a `.env` file and set the environment variables.

```bash
cd client
cp .env.example .env
```

| Variable                   | Description                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `REACT_APP_HOST_BACKEND`   | Used in the frontend application to connect with the backend. Should be `http://localhost:5000` for development. |
| `REACT_APP_HOST_WEBSOCKET` | Used in the frontend application to connect with the WebSocket server and listen for events. Should be `ws://localhost:5000` for development. |

### 🎛️ Server

Copy the `.env.example` file to a `.env` file and set the environment variables.

```bash
cd server
cp .env.example .env
```

| Variable                | Description                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `AGENT_PUBLIC_DID_SEED` | Used in the backend application for the agent. Should be set to your agent's public DID in development/production. |
| `AGENT_ENDPOINT`        | Used in the backend application for the agent. Should be set to your agent's endpoint in development/production.   |
| `AGENT_WALLET_KEY`      | Used in the backend application for the agent. Should be set to your agent's wallet key in development/production. |

### Node version

```bash
nvm use
```

### Install Dependencies

```bash
yarn install
```

### Development

```bash
yarn dev
```

### Tests

The demo has [Cypress](https://www.cypress.io/) integration tests. To run the tests, make sure you have both the client, server and test agent running locally. You can do this by running the commands `yarn dev` in the root of the project. You can then start the tests with `yarn test`. This will open up cypress in chrome from where you can run the tests.

## 🖇️ How To Contribute

You're welcome to contribute to this demo. Please make sure to open an issue first!

This demo is open source and you're more than welcome to customize and use it to create your own self-sovereign identity demo. If you do, an attribution to [Animo](https://animo.id) would be very much appreciated!
