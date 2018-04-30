import * as React from "react";
import { Component, MouseEvent } from 'react';
import Button from 'material-ui/Button';
import Login from './Login';
import Register from './Register';


// { ILoginProps }
// appContext = { this.props.parentContext }
// appContext = { this.props.parentContext }
// parentContext = { this}
// parentContext = { this}

//interface ILoginScreenProps {

//}

interface ILoginScreenState {
	buttonLabel: string;
	loginScreen: Array<any>;
	loginMessage: string;
	isLogin: boolean;
}

const style = {
	margin: 15,
};

//  this.state = {
//	    username: '',
//	    password: '',
//	    loginscreen: [],
//	    loginmessage: '',
//	    buttonLabel: 'Register',
//	    isLogin: true
//}


export default class LoginScreen extends Component<any, ILoginScreenState> {

	public state: ILoginScreenState;

	constructor(
		public props: any
	) {
		super(props);
		this.state = { loginMessage: "", loginScreen: [], buttonLabel: "Register", isLogin: true };
	}

	public componentWillMount() {

		let loginscreen = [<Login {...this.props} key={null} />];
		let loginmessage = "Not registered yet, Register Now";
		this.setState({

			loginScreen: loginscreen,
			loginMessage: loginmessage
		});
	}

	public onBtnClick = (event: any) => this.handleClick(event);

	//className = "loginscreen"

	public render() {
		return (
			<div >
				{this.state.loginScreen}
				<div>
					{this.state.loginMessage}
				</div>
				<Button variant="raised" color="secondary" style={style} onClick={this.onBtnClick}>
					{this.state.buttonLabel}
				</Button>
			</div>
		);
	}

	public handleClick(event: MouseEvent<any>) {
		let loginmessage: string;
		if (this.state.isLogin) {
			let loginscreen = [<Register {...this.props} key={null} />];
			loginmessage = "Already registered. Go to Login";
			this.setState({
				loginScreen: loginscreen,
				loginMessage: loginmessage,
				buttonLabel: "Login",
				isLogin: false
			})
		}
		else {
			let loginscreen = [<Login {...this.props} key={null} />];
			loginmessage = "Not Registered yet. Go to registration";
			this.setState({
				loginScreen: loginscreen,
				loginMessage: loginmessage,
				buttonLabel: "Register",
				isLogin: true
			})
		}
	}

}


