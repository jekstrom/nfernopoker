import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import * as SnackMessage from './SnackMessage';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import * as firebase from "firebase";

export default function configureStore(history: any, initialState: any) {

  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyBGLY2OiLI-vcmE5Y8N0pLG5_b2Tn9nlyE",
    authDomain: "nfernopoker.firebaseapp.com",
    databaseURL: "https://nfernopoker.firebaseio.com",
    messagingSenderId: "1013092913351",
    projectId: "nfernopoker",
    storageBucket: ""
  };

  // react-redux-firebase options
  const config = {
    userProfile: 'users', // firebase root where user profiles are stored
    presence: 'presence', // where list of online users is stored in database
    sessions: 'sessions', // where list of user sessions is stored in database (presence must be enabled)
    attachAuthIsReady: true, // attaches auth is ready promise to store
    enableLogging: true, // enable/disable Firebase's database logging
  }

  firebase.initializeApp(firebaseConfig);

  // Add redux Firebase to compose
  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, config)
  )(createStore)

  const reducers = {
    snack: SnackMessage.reducer
  };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && (window as any).devToolsExtension) {
    enhancers.push((window as any).devToolsExtension());
  }

  const rootReducer = combineReducers({
    firebase: firebaseReducer,
    ...reducers,
    routing: routerReducer
  });

  // Create store with reducers and initial state
  let store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );

  return store;
}
