import * as React from "react";
import * as redux from 'redux';
import { Component } from 'react';
import { Snackbar, IconButton } from "material-ui";
import { Close } from "@material-ui/icons";
import { connect } from "react-redux";
import { MessageTypes } from "../actions/Message";

// Props
// Local props
interface ISnackWrapperProps {
	classes: any;
}
// Connected Redux state
interface IConnectedState {
	message: string;
	open: boolean;
}
// Connected Redux action dispatch
interface IConnectedDispatch {
	sendMessage: (message: string) => void,
	clear: () => void
}

type IProps = ISnackWrapperProps & IConnectedState & IConnectedDispatch

class SnackWrapperComponent extends Component<IProps, {}> {
	public render() {
		return (
			<Snackbar
				open={this.props.open}
				autoHideDuration={5000}
				SnackbarContentProps={{
					'aria-describedby': 'message-id',
				}}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						className={this.props.classes.close}
						onClick={this.props.clear}
					>
						<Close />
					</IconButton>,
				]}
				message={<span id="message-id"
				>{this.props.message}</span>}
			/>
		);
	}
}

const mapStateToProps = (state: Types.Message, props: IProps): IConnectedState => ({
	message: state.message,
	open: state.open
});
const mapDispatchToProps = (dispatch: redux.Dispatch<Types.Store>): IConnectedDispatch => ({
	sendMessage: (message: string) => {
		dispatch({ type: MessageTypes.ToastMessage, payload: message });
	},
	clear: () => {
		dispatch({ type: MessageTypes.ToastClearMessage });
	}
});

export const SnackWrapper: React.ComponentClass<IProps> = connect(mapStateToProps, mapDispatchToProps)(SnackWrapperComponent);