import * as React from 'react';
import { Divider, Drawer, MenuItem } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import AppHeader from './AppHeader';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import { Component, MouseEvent } from 'react';
import { firebaseConnect } from 'react-redux-firebase'; //isEmpty
import { compose } from 'redux';
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
  drawerPaper: {
    position: 'relative',
    minWidth: 240
  },
  content: {
    backgroundColor: theme.palette.background.default,
    backgroundImage: "url("+ require('../../public/img/hell.jpg') +")",
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
    filter: 'saturate(125%)',
    gridArea: 'main'
  },
  toolbar: theme.mixins.toolbar
});

class Layout extends Component<ILayoutProps> {

  constructor(
    public props: ILayoutProps
  ) {
    super(props)
  }

  logout = (event: MouseEvent<HTMLElement>) => {
    this.props.firebase.logout();
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className={this.props.classes.root} >
          <AppHeader {...this.props} />
          <Drawer
            variant="permanent"
            style={{ gridArea: 'drawer' }}
            classes={{
              paper: this.props.classes.drawerPaper
            }}
          >
            <Link to={'/'}><MenuItem selected={window.location.pathname === '/'}>Home</MenuItem></Link>
            <Divider />
            <Link to={'/teams'}><MenuItem selected={window.location.pathname === '/teams'}>Teams</MenuItem></Link>
            <Link to={'/game/new'}><MenuItem selected={window.location.pathname === '/game/new'}>New Game</MenuItem></Link>
            <Link to={'/game'}><MenuItem selected={window.location.pathname === '/game'}>Game</MenuItem></Link>
            <Link to={'/games'}><MenuItem selected={window.location.pathname === '/games'}>All Games</MenuItem></Link>
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
