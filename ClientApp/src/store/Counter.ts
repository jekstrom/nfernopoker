import { combineReducers } from 'redux'
import { Action } from '../actions/Counter'

// export type Counter = { value: number }

const counterState: { value: number } = { value: 0 }

function counter(state: { value: number } = counterState, action: Action): { value: number } {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      const { delta } = action
      return { value: state.value + delta }

    case 'RESET_COUNTER':
      return { value: 0 }

    default:
      return state
  }
}

export const initialState = {
  counter: counterState,
  isSaving: false,
  isLoading: false,
  error: '',
}

const reducers = combineReducers<{ counter: { value: number } }>({
  counter
})


export default reducers
