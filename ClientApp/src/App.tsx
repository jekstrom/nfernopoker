import * as React from 'react';
import {  Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import { firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { withRouter } from "react-router";
import Layout from './core/components/Layout';
import LoginScreen from './scenes/login/LoginScreen';
import { GameScreen } from './components/GameScreen';
import { GamesScreen } from './components/Games';
import { TeamsScreen } from './components/TeamsScreen';
import NewGame from './components/NewGame';
import PageNotFound from './core/components/PageNotFound';

const LoggedInRoutes = [
  <Route exact={true} path='/teams' component={TeamsScreen} />,
  <Route exact={true} path='/games' component={GamesScreen} />,
  <Route exact={true} path='/game' component={GameScreen} />,
  <Route exact={true} path='/game/new' component={NewGame} />
];

const LoggedOutRoutes = [
  <Route exact={true} path='/' component={LoginScreen} />
];

class App extends React.Component<any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    let loggedIn = !isEmpty(this.props.auth);
    return (
      <Layout>
          <Switch>
            {[
              !loggedIn && LoggedOutRoutes,
              loggedIn && LoggedInRoutes,
              <Route component={PageNotFound} />
            ]}
          </Switch>
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
