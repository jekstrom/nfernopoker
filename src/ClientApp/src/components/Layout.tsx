import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import { MenuItem, MuiThemeProvider } from 'material-ui';
import { createMuiTheme } from 'material-ui/styles';
import orange from 'material-ui/colors/orange';
import { connect } from 'react-redux'
import { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import AppHeader from './AppHeader';

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

class Layout extends Component<ILayoutProps> {

  constructor(
    public props: ILayoutProps
  ) {
    super(props)
  }

  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className={this.props.classes.root} >
          <AppHeader {...this.props} />
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
