import * as React from "react";
import { Component, MouseEvent } from 'react';
import Button from 'material-ui/Button';
import Login from './Login';
import Register from './Register';
import { Grid, withStyles } from "material-ui";
import { firebaseConnect } from "react-redux-firebase";
import { withRouter, RouteComponentProps } from "react-router";

interface ILoginScreenState {
	buttonLabel: string;
	loginScreen: Array<any>;
	loginMessage: string;
	isLogin: boolean;
}

interface ILoginScreenProps {
	classes: any;
	firebase: any;
	router: any;
}

const styles: any = (theme: any) => ({
	button: { margin: 15 },
	close: {
		width: theme.spacing.unit * 4,
		height: theme.spacing.unit * 4,
	},
	login: {
		minWidth: "300px",
		backgroundColor: theme.palette.background.default,
		padding: "10px"
	},
	root: {
		height: "100%"
	}
});

@firebaseConnect()
class LoginScreen extends Component<ILoginScreenProps & RouteComponentProps<any>, ILoginScreenState> {

	public state: ILoginScreenState;

	constructor(
		public props: ILoginScreenProps & RouteComponentProps<any>
	) {
		super(props);
		this.state = { loginMessage: "", loginScreen: [], buttonLabel: "Register", isLogin: true };
	}

	public componentWillMount() {
		let loginscreen = [<Login {...this.props} key={1} />];
		let loginmessage = "Not registered yet, Register Now";
		this.setState({
			loginScreen: loginscreen,
			loginMessage: loginmessage
		});
	}

	public onBtnClick = (event: any) => this.handleClick(event);

	public render() {
		return (
			<Grid className={this.props.classes.root} container={true} alignItems="center" alignContent="center" justify="center" direction="row">
				<Grid item={true} className={this.props.classes.login}>
						{this.state.loginScreen}
						<div>
							{this.state.loginMessage}
						</div>
						<Button variant="raised" type="Submit" color="secondary" className={this.props.classes.button} onClick={this.onBtnClick}>
							{this.state.buttonLabel}
						</Button>
				</Grid>
			</Grid>
		);
	}

	public handleClick(event: MouseEvent<any>) {
		let loginmessage: string;
		if (this.state.isLogin) {
			let loginscreen = [<Register {...this.props} key={2} />];
			loginmessage = "Already registered. Go to Login";
			this.setState({
				loginScreen: loginscreen,
				loginMessage: loginmessage,
				buttonLabel: "Login",
				isLogin: false
			})
		}
		else {
			let loginscreen = [<Login {...this.props} key={3} />];
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
export default withStyles(styles)(withRouter(LoginScreen));