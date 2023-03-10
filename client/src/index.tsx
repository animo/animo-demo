import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import './index.css'
import * as Redux from './store/configureStore'
import { KBar } from './utils/KBar'

const { store, persistor } = Redux

const container = document.getElementById('root')

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)

const content = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <KBar>
          <App />
        </KBar>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (window.Cypress) {
  // Cypress is running, don't use StrictMode because it doesn't really like the double execution of effects in StrictMode
  root.render(content)
} else {
  root.render(<React.StrictMode>{content}</React.StrictMode>)
}
