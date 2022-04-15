import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import rootReducer from '../slices/index'

export const persistConfig = {
  key: 'redux-store-root',
  storage,
  whitelist: ['preferences', 'characters', 'onboarding', 'credentials', 'connection'],
  version: 4,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(persistedReducer, undefined, composeEnhancer(applyMiddleware(thunk)))
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
