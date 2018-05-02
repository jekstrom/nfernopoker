import * as React from "react";
import { Component, MouseEvent } from 'react';
import { Snackbar, IconButton } from "material-ui";
import { Close } from "@material-ui/icons";
//import { mapDispatchToProps } from '../actions/Message';
//import { connect } from "react-redux";

export interface ISnackWrapperProps {
	classes: any;
	message: string;
	open: boolean;
}

export default class SnackWrapper extends Component<ISnackWrapperProps, any> {

	constructor(
		public props: ISnackWrapperProps
	) {
		super(props);
	}

	public handleClose = (event: MouseEvent<HTMLElement>) => {
		this.setState({ message: "" });
	}

	public render() {
		return (
			<Snackbar
				open={true}
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
						onClick={this.handleClose}
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

//const mapStateToProps = (state: Types.Message, props: ISnackWrapperProps) => {
//	props.message = state.message;
//	props.open = state.open;
//};

//export default conn(SnackWrapper);