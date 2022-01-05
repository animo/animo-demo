import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
// eslint-disable-next-line import/order
import reportWebVitals from './reportWebVitals'

import './index.css'

import * as Redux from './store/configureStore'
import { KBar } from './utils/KBar'

const { store, persistor } = Redux

render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <KBar>
            <App />
          </KBar>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
)

// eslint-disable-next-line no-console
reportWebVitals(console.log())
