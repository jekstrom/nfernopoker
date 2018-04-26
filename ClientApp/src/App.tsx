import * as React from 'react';
import { Route } from 'react-router';
import CounterWithFirebase from './components/CounterWithFirebase';
import Register from './components/Register';
import Home from './components/Home';
import Layout from './components/Layout';

export default class App extends React.Component {
  public render() {
    return (
        <Layout>
          <Route exact={true} path='/' component={Home} />
          <Route path='/counter' component={CounterWithFirebase as any} />
          <Route path='/register' component={Register as any} />
        </Layout>
    );
  }
}
