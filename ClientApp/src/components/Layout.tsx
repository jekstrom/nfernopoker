import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import { MenuItem, MuiThemeProvider, IconButton, Button } from 'material-ui';
import { createMuiTheme } from 'material-ui/styles';
import orange from 'material-ui/colors/orange';
import { connect } from 'react-redux'
import { Component, MouseEvent } from 'react';
import { firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { AccountCircle } from '@material-ui/icons';

export interface ILayoutProps {
  firebase: any;
  classes: any;
  children: any;
  profile: any;
  auth: any;
}

const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
});

const styles: any = (theme: any) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appTitle: {
    flex: 1
  },
  drawerPaper: {
    position: 'relative',
    width: 240,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    backgroundImage: `url('/img/hell.jpg')`,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

//TODO: Break AppBar logic out into separate component.
class Layout extends Component<ILayoutProps> {

  constructor(
    public props: ILayoutProps
  ) {
    super(props)
  }

  public logout = (event: MouseEvent<HTMLElement>) => {
    this.props.firebase.logout();
  };

  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className={this.props.classes.root} >
          <AppBar position="absolute" className={this.props.classes.appBar}>
            <Toolbar>
              <Typography className={this.props.classes.appTitle} variant="title" color="inherit" noWrap={true}>
                NFERNO-POKER
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
          <Drawer
            variant="permanent"
            classes={{
              paper: this.props.classes.drawerPaper,
            }}
          >
            <div className={this.props.classes.toolbar} />
            <MenuItem>
              <Link to={'/'}>Home</Link>
            </MenuItem>
            <Divider />
            <MenuItem>
              <Link to={'/counter'}>Counter</Link>
            </MenuItem>
          </Drawer>
          <main className={this.props.classes.content}>
            <div className={this.props.classes.toolbar} />
            {this.props.children}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default compose(
  withStyles(styles),
  firebaseConnect(),
  connect((state: any, props: any) => ({
    firebase: props.firebase,
    auth: state.firebase.auth,
    profile: state.firebase.profile // load profile
  }))
)(Layout);
