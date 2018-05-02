import * as React from "react";
import { Component, MouseEvent, ChangeEvent } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { RouteComponentProps } from "react-router";

export interface IRegisterProps {
	firebase: any;
	classes: any;
}

export interface IRegisterState {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	errorMessage: string;
}

export default class Register extends Component<IRegisterProps & RouteComponentProps<any>, IRegisterState> {

	constructor(
		public props: IRegisterProps & RouteComponentProps<any>,
		public state: IRegisterState
	) {
		super(props, state);
	}

	private _style = { margin: 15 };

	public setFirst = (event: ChangeEvent<HTMLInputElement>) => this.setState({ firstName: event.target.value });
	public setLast = (event: ChangeEvent<HTMLInputElement>) => this.setState({ lastName: event.target.value });
	public setEmail = (event: ChangeEvent<HTMLInputElement>) => this.setState({ email: event.target.value });
	public setPassword = (event: ChangeEvent<HTMLInputElement>) => this.setState({ password: event.target.value });
	public handleSubmit = (event: any) => this.handleClick(event);

	public handleClick = (event: MouseEvent<HTMLInputElement>) => {
		event.preventDefault();
		event.stopPropagation();
		try {
			this.props.firebase.createUser(
				{ email: this.state.email, password: this.state.password },
				{ firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email }
			).then((r: any) => {
				this.props.history.push('/counter');
			}, (e: any) => {
				this.setState({ errorMessage: e.message });
			});
		} catch (ex) {
			this.setState({ errorMessage: ex.message });
		}
	}
	//TODO: Look into using SnackWrapper with state and only having one instance of the component.
	public render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<TextField
					required={true}
					fullWidth={true}
					helperText="Enter your First Name"
					label="First Name"
					onChange={this.setFirst}
				/>
				<br />
				<TextField
					required={true}
					fullWidth={true}
					helperText="Enter your Last Name"
					label="Last Name"
					onChange={this.setLast}
				/>
				<br />
				<TextField
					required={true}
					fullWidth={true}
					helperText="Enter your Email"
					type="email"
					label="Email"
					onChange={this.setEmail}
				/>
				<br />
				<TextField
					required={true}
					fullWidth={true}
					type="password"
					helperText="Enter your Password"
					label="Password"
					onChange={this.setPassword}
				/>
				<br />
				<Button variant="raised" type="submit" style={this._style}>
					Submit
				</Button>
			</form>
		);
	}

}
