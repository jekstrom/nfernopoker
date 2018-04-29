import * as React from "react";
import { TextField, Button, Grid, withStyles, Snackbar, IconButton } from 'material-ui';
import { Close } from "@material-ui/icons";
import { firebaseConnect } from "react-redux-firebase";
import { Component, MouseEvent, ChangeEvent } from "react";

//interface ILoginProps {
//	firebase: any;
//}

interface ILoginState {
	username: string;
	password: string;
	errorMessage: string;
	loginMessage: string;
}

const styles: any = (theme: any) => ({
	root: {
		height: "100%"
	},
	login: {
		width: "300px",
		backgroundColor: theme.palette.background.default,
		padding: "25px"
	},
	button: { margin: 15 },
	close: {
		width: theme.spacing.unit * 4,
		height: theme.spacing.unit * 4,
	},
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

	public handleClose = (event: MouseEvent<HTMLElement>) => {
		this.setState({ errorMessage: undefined });
	}

	public render() {
		return (
			<Grid className={this.props.classes.root} container={true} alignItems="center" alignContent="center" justify="center" direction="row">
				<Grid item={true} className={this.props.classes.login} >
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
					<Button className={this.props.classes.button} variant="raised" title="Register" color="secondary" onClick={this.login}>Register</Button>
				</Grid>
				<Snackbar
					open={this.state.errorMessage != undefined}
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
					>{this.state.errorMessage}</span>}

				/>
			</Grid >
		);
	}

	public login = (event: MouseEvent<any>) => {
		try {
			this.props.firebase.login({
				email: this.state.username,
				password: this.state.password
			}).then((r: any) => {
				console.log(r);
			}, (e: any) => {
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
			this.state.errorMessage = ex.message;
		}
	}

}

export default withStyles(styles)(Login);