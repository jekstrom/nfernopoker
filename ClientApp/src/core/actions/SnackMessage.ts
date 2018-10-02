import { AnyAction } from 'redux';

export class MessageTypes {
  public static readonly ToastMessage = 'TOAST_MSG';
  public static readonly ToastClearMessage = 'TOAST_CLEAR_MSG';
}

const initialState = {
  message: "",
  open: false
};

export const reducer = (state: Types.Message, action: AnyAction) => {
  state = state || initialState;

  if (action.type == MessageTypes.ToastMessage) {
    return {
      ...state,
      message: action.payload,
      open: true
    };
  }

  if (action.type == MessageTypes.ToastClearMessage) {
    return {
      ...state,
      message: "",
      open: false
    };
  }

  return state;
};
