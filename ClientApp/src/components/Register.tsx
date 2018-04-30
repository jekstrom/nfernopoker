import * as React from "react";
import { Component, MouseEvent, ChangeEvent } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { firebaseConnect } from "react-redux-firebase";

export interface IRegisterProps {
	firebase: any;
}

export interface IRegisterState {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

@firebaseConnect()
class Register extends Component<any, any> {

	constructor(
		public props: any,
		public state: any
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
		this.props.firebase.createUser(
			{ email: this.state.email, password: this.state.password },
			{ firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email }
		)
	}

	public render() {
		return (
			<div>
				<TextField
					helperText="Enter your First Name"
					label="First Name"
					onChange={this.setFirst}
				/>
				<br />
				<TextField
					helperText="Enter your Last Name"
					label="Last Name"
					onChange={this.setLast}
				/>
				<br />
				<TextField
					helperText="Enter your Email"
					type="email"
					label="Email"
					onChange={this.setEmail}
				/>
				<br />
				<TextField
					type="password"
					helperText="Enter your Password"
					label="Password"
					onChange={this.setPassword}
				/>
				<br />
				<Button variant="raised" type="submit" style={this._style} onClick={this.handleSubmit}>
					Submit
				</Button>
			</div>
		);
	}

}


export default Register;