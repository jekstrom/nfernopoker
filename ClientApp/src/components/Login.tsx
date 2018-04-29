import * as React from "react";
import { TextField, Button, Grid, withStyles } from 'material-ui';
import { firebaseConnect } from "react-redux-firebase";
import { Component, MouseEvent, ChangeEvent } from "react";

//interface ILoginProps {
//	firebase: any;
//}

interface ILoginState {
	username: string;
	password: string;
	loginMessage: string;
}

const styles: any = (theme: any) => ({
	login: {
		width: "300px",
		backgroundColor: theme.palette.background.default,
		padding: "25px"
	},
	button: { margin: 15 },
});


@firebaseConnect()
class Login extends Component<ILoginState> {

	constructor(
		public props: any,
		public state: ILoginState
	) {
		super(props, state);
	}

	public storeUser = (event: ChangeEvent<HTMLInputElement>) => this.setState({ username: event.target.value });
	public storePwrd = (event: ChangeEvent<HTMLInputElement>) => this.setState({ password: event.target.value });

	public componentWillMount() {
		this.setState({
			loginMessage: "Not registered yet, Register Now"
		})
	}

	public render() {
		return (
			<Grid container={true} alignItems="center" alignContent="center" justify="center" direction="row">
				<Grid item={true} alignContent="space-around" className={this.props.classes.login} >
					<TextField
						id="username"
						fullWidth={true}
						helperText="Enter your Username"
						label="Username"
						onChange={this.storeUser}
					/>
					<br />
					<TextField
						id="pword"
						fullWidth={true}
						type="password"
						helperText="Enter your Password"
						label="Password"
						onChange={this.storePwrd}
					/>
					<br />
					<Button className={this.props.classes.button} variant="raised" title="Submit" type="submit" color="primary" onClick={this.login}>Submit</Button>
					<br />
					{this.state.loginMessage}
					<br />
					<Button className={this.props.classes.button} variant="raised" title="Register" color="secondary" onClick={this.login}>Register</Button>
				</Grid>
			</Grid >
		);
	}

	public login = (event: MouseEvent<any>) => {
		this.props.firebase.login({
			email: this.state.username,
			password: this.state.password
		});
	}

}

export default withStyles(styles)(Login);