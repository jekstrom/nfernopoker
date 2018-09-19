import * as React from "react";
import { Component } from 'react';
import { Login } from './Login';
import { Register } from './Register';
import { Grid, withStyles, Card } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router";

interface ILoginScreenState {
  isLogin: boolean;
}

interface ILoginScreenProps {
  classes: any;
  firebase: any;
  router: any;
}

const styles: any = (theme: any) => ({
  button: { margin: theme.spacing.unit },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  login: {
    minWidth: "300px",
  },
  root: {
    height: "100%"
  }
});

class LoginScreen extends Component<ILoginScreenProps & RouteComponentProps<any>, ILoginScreenState> {

  public state: ILoginScreenState;

  constructor(
    public props: ILoginScreenProps & RouteComponentProps<any>
  ) {
    super(props);
    this.state = { isLogin: true };
  }

  public render() {
    const loginScreen =
      this.state.isLogin ?
        <Register classes={this.props.classes} secondaryButtonText='Log in instead' onSecondaryButton={this.toggleState} /> :
        <Login classes={this.props.classes} secondaryButtonText='No account?' onSecondaryButton={this.toggleState} />
    return (
      <Grid className={this.props.classes.root} container={true} alignItems="center" alignContent="center" justify="center" direction="row">
        <Grid item={true} className={this.props.classes.login}>
          <Card>
            {loginScreen}
          </Card>
        </Grid>
      </Grid>
    );
  }

  private toggleState = () => {
    const newState = {
      isLogin: !this.state.isLogin
    };
    this.setState(newState);
  }

}
export default withStyles(styles)(withRouter(LoginScreen));
