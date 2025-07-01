'use client'

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'

// State interfaces
interface PreferencesState {
  darkMode: boolean
  completedUseCaseSlugs: string[]
  demoCompleted: boolean
  connectionDate?: Date
  lastServerReset?: Date
}

interface OnboardingState {
  onboardingStep: number
  connectionId?: string
  isCompleted: boolean
}

interface AppState {
  preferences: PreferencesState
  onboarding: OnboardingState
  currentCharacter?: any
  section: {
    currentSection: number
  }
}

// Actions
type Action =
  | { type: 'SET_DARK_MODE'; payload: boolean }
  | { type: 'USE_CASE_COMPLETED'; payload: string }
  | { type: 'SET_DEMO_COMPLETED' }
  | { type: 'SET_CONNECTION_DATE'; payload: Date }
  | { type: 'RESET_DASHBOARD' }
  | { type: 'NEXT_ONBOARDING_STEP' }
  | { type: 'PREV_ONBOARDING_STEP' }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'SET_ONBOARDING_CONNECTION_ID'; payload: string }
  | { type: 'RESET_ONBOARDING' }
  | { type: 'SET_CURRENT_CHARACTER'; payload: any }
  | { type: 'REMOVE_CURRENT_CHARACTER' }
  | { type: 'SET_CURRENT_SECTION'; payload: number }
  | { type: 'RESET_DEMO' }

const initialState: AppState = {
  preferences: {
    darkMode: false,
    completedUseCaseSlugs: [],
    demoCompleted: false,
    connectionDate: undefined,
    lastServerReset: undefined,
  },
  onboarding: {
    onboardingStep: 0,
    connectionId: undefined,
    isCompleted: false,
  },
  currentCharacter: undefined,
  section: {
    currentSection: 0,
  },
}

// Load state from localStorage
const loadState = (): AppState => {
  if (typeof window === 'undefined') return initialState

  try {
    const savedState = localStorage.getItem('animo-demo-state')
    if (savedState) {
      const parsed = JSON.parse(savedState)
      return {
        ...initialState,
        ...parsed,
        preferences: {
          ...initialState.preferences,
          ...parsed.preferences,
          darkMode: localStorage.getItem('theme') === 'dark',
        },
      }
    }
  } catch (error) {
    console.error('Error loading state from localStorage:', error)
  }
  
  return {
    ...initialState,
    preferences: {
      ...initialState.preferences,
      darkMode: localStorage.getItem('theme') === 'dark',
    },
  }
}

// Save state to localStorage
const saveState = (state: AppState) => {
  if (typeof window === 'undefined') return

  try {
    const stateToSave = {
      preferences: state.preferences,
      onboarding: state.onboarding,
      currentCharacter: state.currentCharacter,
    }
    localStorage.setItem('animo-demo-state', JSON.stringify(stateToSave))
  } catch (error) {
    console.error('Error saving state to localStorage:', error)
  }
}

// Reducer
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_DARK_MODE':
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload ? 'dark' : 'light')
        if (action.payload) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
      return {
        ...state,
        preferences: {
          ...state.preferences,
          darkMode: action.payload,
        },
      }

    case 'USE_CASE_COMPLETED':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          completedUseCaseSlugs: [...state.preferences.completedUseCaseSlugs, action.payload],
        },
      }

    case 'SET_DEMO_COMPLETED':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          demoCompleted: true,
        },
      }

    case 'SET_CONNECTION_DATE':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          connectionDate: action.payload,
        },
      }

    case 'RESET_DASHBOARD':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          completedUseCaseSlugs: [],
        },
      }

    case 'NEXT_ONBOARDING_STEP':
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          onboardingStep: state.onboarding.onboardingStep + 1,
        },
      }

    case 'PREV_ONBOARDING_STEP':
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          onboardingStep: state.onboarding.onboardingStep - 1,
        },
      }

    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          isCompleted: true,
        },
      }

    case 'SET_ONBOARDING_CONNECTION_ID':
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          connectionId: action.payload,
        },
      }

    case 'RESET_ONBOARDING':
      return {
        ...state,
        onboarding: {
          onboardingStep: 0,
          connectionId: undefined,
          isCompleted: false,
        },
      }

    case 'SET_CURRENT_CHARACTER':
      return {
        ...state,
        currentCharacter: action.payload,
      }

    case 'REMOVE_CURRENT_CHARACTER':
      return {
        ...state,
        currentCharacter: undefined,
      }

    case 'SET_CURRENT_SECTION':
      return {
        ...state,
        section: {
          currentSection: action.payload,
        },
      }

    case 'RESET_DEMO':
      return {
        ...initialState,
        preferences: {
          ...initialState.preferences,
          darkMode: state.preferences.darkMode,
        },
      }

    default:
      return state
  }
}

// Context
const AppStateContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<Action>
} | null>(null)

// Provider
export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState, loadState)

  // Save to localStorage whenever state changes (for persisted parts)
  useEffect(() => {
    saveState(state)
  }, [state])

  // Apply dark mode on mount
  useEffect(() => {
    if (state.preferences.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [state.preferences.darkMode])

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}

// Hook to use the context
export const useAppState = () => {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider')
  }
  return context
}

// Convenience hooks for specific parts of state
export const usePreferences = () => {
  const { state, dispatch } = useAppState()
  return {
    ...state.preferences,
    setDarkMode: (darkMode: boolean) => dispatch({ type: 'SET_DARK_MODE', payload: darkMode }),
    useCaseCompleted: (slug: string) => dispatch({ type: 'USE_CASE_COMPLETED', payload: slug }),
    setDemoCompleted: () => dispatch({ type: 'SET_DEMO_COMPLETED' }),
    setConnectionDate: (date: Date) => dispatch({ type: 'SET_CONNECTION_DATE', payload: date }),
    resetDashboard: () => dispatch({ type: 'RESET_DASHBOARD' }),
  }
}

export const useOnboarding = () => {
  const { state, dispatch } = useAppState()
  return {
    ...state.onboarding,
    nextStep: () => dispatch({ type: 'NEXT_ONBOARDING_STEP' }),
    prevStep: () => dispatch({ type: 'PREV_ONBOARDING_STEP' }),
    complete: () => dispatch({ type: 'COMPLETE_ONBOARDING' }),
    setConnectionId: (id: string) => dispatch({ type: 'SET_ONBOARDING_CONNECTION_ID', payload: id }),
    reset: () => dispatch({ type: 'RESET_ONBOARDING' }),
  }
}

export const useCurrentCharacter = () => {
  const { state, dispatch } = useAppState()
  return {
    currentCharacter: state.currentCharacter,
    setCharacter: (character: any) => dispatch({ type: 'SET_CURRENT_CHARACTER', payload: character }),
    removeCharacter: () => dispatch({ type: 'REMOVE_CURRENT_CHARACTER' }),
  }
}

export const useSection = () => {
  const { state, dispatch } = useAppState()
  return {
    currentSection: state.section.currentSection,
    setCurrentSection: (section: number) => dispatch({ type: 'SET_CURRENT_SECTION', payload: section }),
  }
}