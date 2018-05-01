import * as React from "react";
import { Component, MouseEvent } from 'react';
import { Snackbar, IconButton } from "material-ui";
import { Close } from "@material-ui/icons";

export interface ISnackWrapperProps {
	errorMessage: string;
	classes: any;
}

export default class SnackWrapper extends Component<ISnackWrapperProps, any> {

	constructor(
		public props: ISnackWrapperProps,
	) {
		super(props);
		this.state = { isOpen: false };
	}

	public get open() {
		return Boolean(this.props.errorMessage);
	}

	public handleClose = (event: MouseEvent<HTMLElement>) => {
		this.setState({ isOpen: false });
	}

	public render() {
		return (
			<Snackbar
				open={this.open}
				autoHideDuration={6000}
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
				>{this.props.errorMessage}</span>}
			/>
		);
	}

}

