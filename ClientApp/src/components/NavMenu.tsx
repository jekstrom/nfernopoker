import * as React from 'react';
//import { Link } from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { AppBar, IconButton, Toolbar, Switch, Menu, MenuItem, FormGroup, FormControlLabel } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';

//class NavMenu extends React.Component<{}, {}> {
//  public render() {
//    return (
//      <Navbar inverse={true} fixedTop={true} fluid={true} collapseOnSelect={true}>
//        <Navbar.Header>
//          <Navbar.Brand>
//            <Link to={'/'}>nfernopoker</Link>
//          </Navbar.Brand>
//          <Navbar.Toggle />
//        </Navbar.Header>
//        <Navbar.Collapse>
//          <Nav>
//            <LinkContainer to={'/'} exact={true}>
//              <NavItem>
//                <Glyphicon glyph='home' /> Home
//              </NavItem>
//            </LinkContainer>
//            <LinkContainer to={'/register'} exact={true}>
//              <NavItem>
//                <Glyphicon glyph='home' /> Register
//              </NavItem>
//            </LinkContainer>
//            <LinkContainer to={'/counter'}>
//              <NavItem>
//                <Glyphicon glyph='education' /> Counter
//              </NavItem>
//            </LinkContainer>
//          </Nav>
//        </Navbar.Collapse>
//      </Navbar>
//    );
//  }
//}

//export default NavMenu;


const drawerWidth = 240;

const styles = (theme: Theme) => ({
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }
});

class NavMenu extends React.Component<any, any> {

  public state: any;

  constructor(props: any) {
    super(props);
    this.state = {
      auth: true,
      anchorEl: null,
    };
  }

  handleDrawerToggle = () => {
    this.props.onDrawerToggle();
  };

  handleChange = (event: any, checked: any) => {
    this.setState({ auth: checked });
  };

  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    let classes = this.props.classes;

    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            aria-label="Open drawer"
            onClick={() => this.handleDrawerToggle()}
            className={classes.navIconHide}
            color="inherit">
            <MenuIcon />
          </IconButton>

          <FormGroup>
            <FormControlLabel
              control={
                <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
              }
              label={auth ? 'Logout' : 'Login'}
            />
          </FormGroup>

          {auth && (
            <div className="menuButton">
              <IconButton
                aria-owns={open ? 'menu-appbar' : ''}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles((styles as any))(NavMenu);
