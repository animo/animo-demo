import { KBarProvider } from 'kbar'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import './index.css'
import * as Redux from './store/configureStore'
import { CommandBar } from './utils/CommandBar'

const { store, persistor } = Redux

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <KBarProvider
          actions={[
            {
              id: 'invitation-type',
              name: 'Change connection invitation type',
              section: 'configuration',
              keywords: 'invitation type',
            },
            {
              id: 'theme',
              name: 'Change theme…',
              keywords: 'interface color dark light',
              section: 'Preferences',
            },
            {
              id: 'issue-credential-protocol-version',
              name: 'Select credential protocol version',
              keywords: 'issue credential protocol version',
              section: 'configuration',
            },
          ]}
          options={{ enableHistory: true, disableScrollbarManagement: true }}
        >
          <CommandBar />
          <App />
        </KBarProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
