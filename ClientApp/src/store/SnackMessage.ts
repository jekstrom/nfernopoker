import { ISnackWrapperProps } from '../components/SnackWrapper';
import { MessageTypes } from '../actions/Message';
import { AnyAction } from 'redux';

const initialState = {
	snack: {
		message: "",
		open: false
	}
};

export const reducer = (state: ISnackWrapperProps, action: AnyAction) => {
	state = state || initialState;
	if (action.type == MessageTypes.ToastMessage) {
		return {
			...state, snack: {
				message: action.payload,
				open: true
			}
		};
	}

	if (action.type == MessageTypes.ToastClearMessage) {
		return {
			...state, snack: {
				message: "",
				open: false
			}
		};
	}
	return state;
};
