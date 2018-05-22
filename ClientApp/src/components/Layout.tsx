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
import { SnackWrapper } from './SnackWrapper';

export interface ILayoutProps {
  snack: any;
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
    display: 'grid',
    grid: `
			[navrow-start] "appbar appbar" 64px [navrow-end]
			[mainrow-start] "drawer main" calc(100vh - 64px) [mainrow-end]
			/ 256px 1fr
		`,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    gridArea: 'appbar'
  },
  appTitle: {
    flex: 1
  },
  drawerPaper: {
    position: 'relative',
    minWidth: 240
  },
  content: {
    backgroundColor: theme.palette.background.default,
    backgroundImage: `url('/img/hell.jpg')`,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
    filter: 'saturate(125%)',
    gridArea: 'main'
  },
  toolbar: theme.mixins.toolbar
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
                isEmpty(this.props.auth) && <Link to={'/'}><Button variant="flat">Login</Button></Link>
              }
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            style={{ gridArea: 'drawer' }}
            classes={{
              paper: this.props.classes.drawerPaper
            }}
          >
            <Link to={'/'}><MenuItem selected={window.location.pathname === '/'}>Home lol</MenuItem></Link>
            <Divider />
            <Link to={'/counter'}><MenuItem selected={window.location.pathname === '/counter'}>Counter</MenuItem></Link>
            <Link to={'/game'}><MenuItem selected={window.location.pathname === '/game'}>Game</MenuItem></Link>
          </Drawer>
          <main className={this.props.classes.content}>
            {this.props.children}
          </main>
        </div>
        <SnackWrapper classes={this.props.classes} />
      </MuiThemeProvider>
    );
  }
}

export default compose(
  withStyles(styles),
  firebaseConnect(),
  connect((state: any, props: any) => ({
    snack: state.snack,
    firebase: props.firebase,
    auth: state.firebase.auth,
    profile: state.firebase.profile // load profile
  }))
)(Layout);
