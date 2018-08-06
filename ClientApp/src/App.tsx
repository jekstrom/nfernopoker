import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Counter from './components/Counter';
import LoginScreen from './components/LoginScreen';
import Layout from './components/Layout';
import { GameScreen } from './components/GameScreen';
import { TeamsScreen } from './components/TeamsScreen';

export default class App extends React.Component {
  public render() {
    return (
      <Layout>
        <Switch>
          <Route exact={true} path='/' component={LoginScreen} />
          <Route path='/counter' component={Counter} />
          <Route path='/game' component={GameScreen} />
          <Route path='/teams' component={TeamsScreen} />
        </Switch>
      </Layout>
    );
  }
}
