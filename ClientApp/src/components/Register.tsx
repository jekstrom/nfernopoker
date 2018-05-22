﻿import * as React from "react";
import * as redux from "redux";
import { Component, MouseEvent, ChangeEvent } from 'react';
import { Button, TextField, CardContent, CardActions, Typography } from 'material-ui';
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { MessageTypes } from "../actions/Message";
import { compose } from "redux";
import { withFirebase } from "react-redux-firebase";

interface ILocalProps {
  classes: any;
  secondaryButtonText: string;
  onSecondaryButton: () => void;
}
interface ILocalState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface IFirebase {
  firebase: any;
}
interface IConnectedDispatch {
  sendMessage: (message: string) => void,
  clear: () => void
}
type IProps = ILocalProps & IConnectedDispatch & RouteComponentProps<any> & IFirebase;

class RegisterComponent extends Component<IProps, ILocalState> {
  constructor(
    public props: IProps
  ) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  public setFirst = (event: ChangeEvent<HTMLInputElement>) => this.setState({ firstName: event.target.value });
  public setLast = (event: ChangeEvent<HTMLInputElement>) => this.setState({ lastName: event.target.value });
  public setEmail = (event: ChangeEvent<HTMLInputElement>) => this.setState({ email: event.target.value });
  public setPassword = (event: ChangeEvent<HTMLInputElement>) => this.setState({ password: event.target.value });
  public handleSubmit = (event: any) => this.handleClick(event);

  public handleClick = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.firebase.createUser(
      { email: this.state.email, password: this.state.password },
      { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email }
    ).then((r: any) => {
      this.props.history.push('/counter');
    }, (e: any) => {
      this.props.sendMessage(e.message);
    }).catch((ex: any) => this.props.sendMessage(ex.message));
  }

  public render() {
    return (
      <React.Fragment>
        <CardContent>
          <Typography className={this.props.classes.title} color="textSecondary">
            Create a new account
          </Typography>
          <TextField
            required={true}
            fullWidth={true}
            label="First Name"
            onChange={this.setFirst}
            className={this.props.classes.button}
          />
          <TextField
            required={true}
            fullWidth={true}
            label="Last Name"
            onChange={this.setLast}
            className={this.props.classes.button}
          />
          <TextField
            required={true}
            fullWidth={true}
            type="email"
            label="Email"
            onChange={this.setEmail}
            className={this.props.classes.button}
          />
          <TextField
            required={true}
            fullWidth={true}
            type="password"
            label="Password"
            onChange={this.setPassword}
            className={this.props.classes.button}
          />
        </CardContent>
        <CardActions>
          <Button className={this.props.classes.button} variant="raised" style={{ marginLeft: '16px' }} title="Register" color="primary" onClick={this.handleSubmit}>
            Register
          </Button>
          <Button onClick={this.props.onSecondaryButton} size="small">
            {this.props.secondaryButtonText}
          </Button>
        </CardActions>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: redux.Dispatch<Types.Store>): IConnectedDispatch => ({
  sendMessage: (message: string) => {
    dispatch({ type: MessageTypes.ToastMessage, payload: message });
  },
  clear: () => {
    dispatch({ type: MessageTypes.ToastClearMessage });
  }
});

export const Register: React.ComponentClass<ILocalProps> = compose<React.ComponentClass<ILocalProps>>(
  connect(null, mapDispatchToProps),
  withRouter,
  withFirebase
)(RegisterComponent)
