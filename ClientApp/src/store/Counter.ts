import { ICounterProps } from '../components/Counter'
import { CountTypes } from '../actions/Counter';

const initialState = { count: 0 };

export const reducer = (state: ICounterProps, action: { type: string }) => {
  state = state || initialState;

  if (action.type === CountTypes.IncrementCountType) {
    console.log(state.count);
    return { ...state, count: state.count + 1 };
  }

  if (action.type === CountTypes.DecrementCountType) {
    return { ...state, count: state.count - 1 };
  }

  return state;
};
