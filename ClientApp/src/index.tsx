import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
//import * as firebase from 'firebase'
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import { firebaseReducer, reactReduxFirebase } from 'react-redux-firebase'
import { Router } from 'react-router';
import configureStore from './store/configureStore';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// const firebaseConfig = {
//   apiKey: "AIzaSyBGLY2OiLI-vcmE5Y8N0pLG5_b2Tn9nlyE",
//   authDomain: "nfernopoker.firebaseapp.com",
//   databaseURL: "https://nfernopoker.firebaseio.com",
//   messagingSenderId: "1013092913351",
//   projectId: "nfernopoker",
//   storageBucket: "",
// };

// const rrfConfig = {
//   userProfile: 'users'
// };

// firebase.initializeApp(firebaseConfig);

// const createStoreWithFirebase = compose(
//   reactReduxFirebase(firebase, rrfConfig)
// )(createStore);

// const rootReducer = combineReducers({
//   firebase: firebaseReducer
// });

//const initialState = {};
// const store = createStoreWithFirebase(rootReducer, initialState);

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

// // Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState;
const store = configureStore(history, initialState);

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  rootElement);

registerServiceWorker();
