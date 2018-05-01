<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as firebase from 'firebase'
=======
>>>>>>> 66fbb86c61c0467cf2ed032478bcb8562f001264
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
<<<<<<< HEAD
import { createStore, combineReducers, compose } from 'redux'
import { firebaseReducer, reactReduxFirebase } from 'react-redux-firebase'
=======
>>>>>>> 66fbb86c61c0467cf2ed032478bcb8562f001264
import { Router } from 'react-router';
//import thunk from 'redux-thunk'
//import configureStore from './store/configureStore';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

<<<<<<< HEAD
const firebaseConfig = {
  apiKey: "AIzaSyBGLY2OiLI-vcmE5Y8N0pLG5_b2Tn9nlyE",
  authDomain: "nfernopoker.firebaseapp.com",
  databaseURL: "https://nfernopoker.firebaseio.com",
  messagingSenderId: "1013092913351",
  projectId: "nfernopoker",
  storageBucket: "nfernopoker.appspot.com",
};

const rrfConfig = {
  userProfile: 'users'
};

firebase.initializeApp(firebaseConfig);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer
});

// export const makeRootReducer = (asyncReducers?: any) => {
//   return combineReducers({
//     // Add sync reducers here
//     firebaseReducer,
//     // firestore: firestoreReducer,
//     ...asyncReducers
//   })
// }

// const middleware = [
//   thunk.withExtraArgument(getFirebase)
//   // This is where you add other middleware like redux-observable
// ]

//const enhancers: any = []
// if (__DEV__) {
//   const devToolsExtension = window.devToolsExtension
//   if (typeof devToolsExtension === 'function') {
//     enhancers.push(devToolsExtension())
//   }
// }

const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);
// const store = createStore(
//   makeRootReducer(),
//   initialState,
//   compose(
//     // pass firebase or app instance and config
//     reactReduxFirebase(firebase, rrfConfig),
//     applyMiddleware(...middleware),
//     ...enhancers as any
//   )
// )
// store.asyncReducers = {}

=======
>>>>>>> 66fbb86c61c0467cf2ed032478bcb8562f001264
// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

// // Get the application-wide store instance, prepopulating with state from the server where available.
// const initialState = (window as any).initialReduxState;
// const store = configureStore(history, initialState);

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  rootElement);

registerServiceWorker();
