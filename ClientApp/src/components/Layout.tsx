import * as React from 'react';
import { Divider, Drawer, MenuItem } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import AppHeader from './AppHeader';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Component } from 'react';
import { firebaseConnect, isEmpty } from 'react-redux-firebase'; //isEmpty
import { compose } from 'redux';
import { SnackWrapper } from './SnackWrapper';

export interface ILayoutProps {
  classes: any;
  children: any;
  auth: any;
  history: any;
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
    backgroundImage: "url(" + require('../../public/img/hell.jpg') + ")",
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

  render() {
    let loggedIn = !isEmpty(this.props.auth);

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
            {!loggedIn &&
              <Link to={'/'}><MenuItem selected={window.location.pathname === '/'}>Login</MenuItem></Link>
            }
            <Divider />
            {loggedIn &&
              (<div>
                <Link to={'/teams'}><MenuItem selected={window.location.pathname === '/teams'}>Teams</MenuItem></Link>
                <Link to={'/game/new'}><MenuItem selected={window.location.pathname === '/game/new'}>New Game</MenuItem></Link>
                <Link to={'/game'}><MenuItem selected={window.location.pathname === '/game'}>Game</MenuItem></Link>
                <Link to={'/games'}><MenuItem selected={window.location.pathname === '/games'}>All Games</MenuItem></Link>
              </div>)
            }
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
    auth: state.firebase.auth
  }))
)(Layout);
