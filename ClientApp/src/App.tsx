import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import { firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { withRouter } from "react-router";
import LoginScreen from './components/LoginScreen';
import Layout from './components/Layout';
import { GameScreen } from './components/GameScreen';
import { GamesScreen } from './components/Games';
import { TeamsScreen } from './components/TeamsScreen';
import NewGame from './components/NewGame';

const LoggedInRoutes = [
  <Route path='/teams' component={TeamsScreen} />,
  <Route path='/games' component={GamesScreen} />,
  <Route path='/game' component={GameScreen} />,
  <Route exact={true} path='/game/new' component={NewGame} />
];

const LoggedOutRoutes = [
  <Route path='/' component={LoginScreen} />
];

class App extends React.Component<any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    let loggedIn = !isEmpty(this.props.auth);
    return (
      <Layout>
        <BrowserRouter>
          <Switch>
            {[
              !loggedIn && LoggedOutRoutes,
              loggedIn && LoggedInRoutes,
              //<Route component={404Route} />
            ]}
          </Switch>
        </BrowserRouter>
      </Layout>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.firebase.auth
});

export default compose(
  withRouter,
  firebaseConnect((props: any) => [
    'auth'
  ]),
  connect(mapStateToProps)
)(App) as React.ComponentClass<any>;




