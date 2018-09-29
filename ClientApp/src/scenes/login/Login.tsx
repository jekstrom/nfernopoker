import * as React from "react";
import * as redux from 'redux';
import { Button, TextField, CardContent, CardActions, Typography } from '@material-ui/core';
import { Component, MouseEvent, ChangeEvent } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { withFirebase } from "react-redux-firebase";
import { MessageTypes } from "../../core/actions/SnackMessage";

interface ILoginProps {
  classes: any;
  secondaryButtonText: string;
  onSecondaryButton: () => void;
}

interface ISnackMessageProps {
  sendMessage: (message: string) => void;
}

interface ILoginState {
  username: string;
  password: string;
}
interface IFirebase {
  firebase: any;
}
type IProps = ILoginProps & ISnackMessageProps & IFirebase & RouteComponentProps<any>;

class LoginComponent extends Component<IProps, ILoginState> {

  public state: ILoginState

  constructor(
    public props: IProps
  ) {
    super(props);
    this.state = { username: "", password: "" };
  }

  public storeUser = (event: ChangeEvent<HTMLInputElement>) => this.setState({ username: event.target.value });
  public storePwrd = (event: ChangeEvent<HTMLInputElement>) => this.setState({ password: event.target.value });

  public login = (event: MouseEvent<any>) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      this.props.firebase.login({
        email: this.state.username,
        password: this.state.password
      }).then(() => {
        this.props.history.push('/games');
      }, (e: any) => {
        this.props.sendMessage(e.message);
      });
    } catch (ex) {
      if (ex.message == 'Sign in failed "Email" must be a valid string.') {
        this.props.sendMessage("Email: must be a valid string.");
        return;
      }
      if (ex.message == 'Sign in failed: "Password" must be a valid string.') {
        this.props.sendMessage("Password: must be a valid string.");
        return;
      }
      this.props.sendMessage(ex.message);
    }
  }

  public render() {
    const { classes } = this.props;
    return (
      <form>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Log in to feel the burn
          </Typography>
          <TextField
            id="username"
            autoComplete="current-user"
            fullWidth={true}
            label="Email"
            onChange={this.storeUser}
            className={classes.button}
          />
          <TextField
            id="pword"
            fullWidth={true}
            type="password"
            label="Password"
            onChange={this.storePwrd}
            className={classes.button}
          />
        </CardContent>
        <CardActions>
          <Button type="submit" className={classes.button} onClick={this.login} variant="raised"
            style={{ marginLeft: '16px' }} title="Login" color="primary">Login</Button>
          <Button onClick={this.props.onSecondaryButton} size="small">
            {this.props.secondaryButtonText}
          </Button>
        </CardActions>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch: redux.Dispatch<Types.Store>): any => ({
  sendMessage: (message: string) => {
    dispatch({ type: MessageTypes.ToastMessage, payload: message });
  }
});

export const Login: React.ComponentClass<ILoginProps> = compose<React.ComponentClass<ILoginProps>>(
  withFirebase,
  withRouter,
  connect(null, mapDispatchToProps)
)(LoginComponent)
