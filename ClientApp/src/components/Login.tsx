import * as React from "react";
import { Button, TextField } from 'material-ui';
import { Component, MouseEvent, ChangeEvent } from "react";
import SnackWrapper from "./SnackWrapper";
import { RouteComponentProps } from "react-router";

export interface ILoginProps {
  classes: any;
  firebase: any;
}

export interface ILoginState {
  username: string;
  password: string;
  errorMessage: string;
  openSnack: boolean;
}

export default class Login extends Component<ILoginProps & RouteComponentProps<any>, ILoginState> {

  constructor(
    public props: ILoginProps & RouteComponentProps<any>,
    public state: ILoginState
  ) {
    super(props);
  }

  public storeUser = (event: ChangeEvent<HTMLInputElement>) => this.setState({ username: event.target.value });
  public storePwrd = (event: ChangeEvent<HTMLInputElement>) => this.setState({ password: event.target.value });

  public closeSnack = () => {
    this.setState({ errorMessage: "", openSnack: false });
  }

  public render() {
    return (
      <form className={this.props.classes.login} onSubmit={this.login}>
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

        <Button className={this.props.classes.button} variant="raised" title="Submit" type="submit" color="primary">Submit</Button>

        <SnackWrapper message={this.state.errorMessage} classes={this.props.classes} open={this.state.openSnack} handleClose={this.closeSnack} />

      </form>
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
        this.setState({ errorMessage: e.message, openSnack: true });
      });
    } catch (ex) {
      if (ex.message == 'signInWithEmailAndPassword failed: First argument "email" must be a valid string.') {
        this.setState({ errorMessage: "Email: must be a valid string.", openSnack: true });
        return;
      }
      if (ex.message == 'signInWithEmailAndPassword failed: Second argument "password" must be a valid string.') {
        this.setState({ errorMessage: "Password: must be a valid string.", openSnack: true });
        return;
      }
      this.setState({ errorMessage: ex.message, openSnack: true });
    }
  }
}
