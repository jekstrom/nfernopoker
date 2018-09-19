import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import Layout from './components/Layout';
import { GameScreen } from './components/GameScreen';
import { GamesScreen } from './components/Games';
import { TeamsScreen } from './components/TeamsScreen';
import NewGame from './components/NewGame';

export default class App extends React.Component {
  public render() {
    return (
      <Layout>
        <Switch>
          <Route path='/game/new' component={NewGame} />
        </Switch>
        <Switch>
          <Route path='/game' component={GameScreen} />
        </Switch>
        <Switch>
          <Route exact={true} path='/' component={LoginScreen} />
          <Route path='/teams' component={TeamsScreen} />
          <Route path='/games' component={GamesScreen} />
        </Switch>
      </Layout>
    );
  }
}
