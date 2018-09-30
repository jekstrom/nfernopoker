import * as React from "react";
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { AccountCircle } from '@material-ui/icons';
import { firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const styles = {
  appBar: {
    zIndex: 5,
    gridArea: 'appbar'
  },
  appTitle: {
    flex: 1
  }
};

class AppHeaderComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public logout = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;
    let title = "N-Ferno Poker";

    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.appTitle} variant="title" color="inherit" noWrap={true}>
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

}


export default compose<React.ComponentClass<any>>(
  withRouter,
  withStyles(styles),
  firebaseConnect((props: any) => {
    return [
      'auth',
      'profile'
    ]
  }),
  connect(
    (state: any) => ({
      auth: state.firebase.auth,
      profile: state.firebase.profile
    })
  )
)(AppHeaderComponent)
