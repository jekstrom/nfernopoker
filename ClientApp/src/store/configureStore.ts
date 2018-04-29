import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import * as Counter from './Counter';
import { reactReduxFirebase } from 'react-redux-firebase';
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
		enableLogging: false, // enable/disable Firebase's database logging
	}

	firebase.initializeApp(firebaseConfig);

	// Add redux Firebase to compose
	const createStoreWithFirebase = compose(
		reactReduxFirebase(firebase, config)
	)(createStore)

	const reducers = {
		counter: Counter.reducer
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
		...reducers,
		routing: routerReducer
	});

	// Create store with reducers and initial state
	return createStoreWithFirebase(
		rootReducer,
		initialState,
		compose(applyMiddleware(...middleware), ...enhancers)
	);

}
