import * as React from 'react';
import { Route } from 'react-router';
<<<<<<< HEAD
import CounterWithFirebase from './components/CounterWithFirebase';
import Register from './components/Register';
import Home from './components/Home';
=======
import Counter from './components/Counter';
import LoginScreen from './components/LoginScreen';
>>>>>>> 66fbb86c61c0467cf2ed032478bcb8562f001264
import Layout from './components/Layout';

export default class App extends React.Component {
  public render() {
    return (
        <Layout>
<<<<<<< HEAD
          <Route exact={true} path='/' component={Home} />
          <Route path='/counter' component={CounterWithFirebase as any} />
          <Route path='/register' component={Register as any} />
=======
          <Route exact={true} path='/' component={LoginScreen} />
          <Route path='/counter' component={Counter} />
>>>>>>> 66fbb86c61c0467cf2ed032478bcb8562f001264
        </Layout>
    );
  }
}
