import * as React from "react";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Component, MouseEvent } from "react";
import { AccountCircle } from '@material-ui/icons';
import { firebaseConnect, isEmpty } from 'react-redux-firebase';
import { IconButton, Button } from 'material-ui';
import { Link } from 'react-router-dom';

@firebaseConnect()
export default class AppHeader extends Component {

  constructor(
    public props: any
  ) {
    super(props);
  }

  public render() {
    let title = "N-Ferno Poker";

    return (
      <AppBar position="absolute" className={this.props.classes.appBar}>
        <Toolbar>
          <Typography className={this.props.classes.appTitle} variant="title" color="inherit" noWrap={true}>
            {title}
          </Typography>
          {
            !isEmpty(this.props.auth) &&
            <div>
              <Button variant="flat" onClick={this.logout}>Logout</Button>
              <IconButton
                aria-owns='menu-appbar'
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <span>{this.props.profile.firstName} {this.props.profile.lastName}</span>
            </div>
          }
          {
            isEmpty(this.props.auth) && <Link to={'/'}>Login</Link>
          }
        </Toolbar>
      </AppBar>
    );
  }

  public logout = (event: MouseEvent<HTMLElement>) => {
    this.props.firebase.logout();
  };

}
