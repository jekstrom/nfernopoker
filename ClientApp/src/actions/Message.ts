export class MessageTypes {
	public static readonly ToastMessage = 'TOAST_MSG';
	public static readonly ToastClearMessage = 'TOAST_CLEAR_MSG';
}

export const mapDispatchToProps = (dispatch: any) => ({
	sendMessage: (message: string) => {
		dispatch({ type: MessageTypes.ToastMessage, payload: message });
	},
	clear: () => {
		dispatch({ type: MessageTypes.ToastClearMessage });
	}
});
