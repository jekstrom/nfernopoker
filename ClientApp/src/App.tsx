import * as React from 'react';
import { Route } from 'react-router';
import Counter from './components/Counter';
import Login from './components/Login';
import Layout from './components/Layout';

export default class App extends React.Component {
  public render() {
    return (
        <Layout>
          <Route exact={true} path='/' component={Login} />
          <Route path='/counter' component={Counter} />
        </Layout>
    );
  }
}
