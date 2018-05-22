import * as React from "react";
import { Button, TextField, CardContent, CardActions, Typography } from 'material-ui';
import { Component, MouseEvent, ChangeEvent } from "react";
import { compose } from "redux";
import { RouteComponentProps, withRouter } from "react-router";
import { withFirebase } from "react-redux-firebase";

interface ILoginProps {
	classes: any;
	secondaryButtonText: string;
	onSecondaryButton: () => void;
}
interface ILoginState {
	username: string;
	password: string;
	errorMessage: string;
}
interface IFirebase {
	firebase: any;
}
type IProps = ILoginProps & IFirebase & RouteComponentProps<any>;

class LoginComponent extends Component<IProps, ILoginState> {

	public state: ILoginState

	constructor(
		public props: IProps,
	) {
		super(props);
		this.state = { username: "", password: "", errorMessage: "" };
	}

	public storeUser = (event: ChangeEvent<HTMLInputElement>) => this.setState({ username: event.target.value });
	public storePwrd = (event: ChangeEvent<HTMLInputElement>) => this.setState({ password: event.target.value });

	public handleClose = (event: MouseEvent<HTMLElement>) => {
		this.setState({ errorMessage: "" });
	}

	public render() {
		return (
			<React.Fragment>
				<CardContent>
					<Typography className={this.props.classes.title} color="textSecondary">
						Log in to feel the burn
					</Typography>
					<TextField
						id="username"
						fullWidth={true}
						label="Email"
						onChange={this.storeUser}
						className={this.props.classes.button}
					/>
					<TextField
						id="pword"
						fullWidth={true}
						type="password"
						label="Password"
						onChange={this.storePwrd}
						className={this.props.classes.button}
					/>
				</CardContent>
				<CardActions>
					<Button className={this.props.classes.button} onClick={this.login} variant="raised" style={{ marginLeft: '16px' }} title="Login" color="primary">Login</Button>
					<Button onClick={this.props.onSecondaryButton} size="small">
						{this.props.secondaryButtonText}
					</Button>
				</CardActions>
			</React.Fragment>
		);
	}

	public login = (event: MouseEvent<any>) => {
		event.preventDefault();
		event.stopPropagation();
		try {
			this.props.firebase.login({
				email: this.state.username,
				password: this.state.password
			}).then((r: any) => {
				this.props.history.push('/counter');
			}, (e: any) => {
				console.log(e);
				this.setState({ errorMessage: e.message });
			});
		} catch (ex) {
			if (ex.message == 'signInWithEmailAndPassword failed: First argument "email" must be a valid string.') {
				this.setState({ errorMessage: "Email: must be a valid string." });
				return;
			}
			if (ex.message == 'signInWithEmailAndPassword failed: Second argument "password" must be a valid string.') {
				this.setState({ errorMessage: "Password: must be a valid string." });
				return;
			}
			this.setState({ errorMessage: ex.message });
		}
	}
}

export const Login: React.ComponentClass<ILoginProps> = compose<React.ComponentClass<ILoginProps>>(
	withFirebase,
	withRouter,
)(LoginComponent)