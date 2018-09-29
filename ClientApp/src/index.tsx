import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState;
const store = configureStore(history, initialState);

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement);

registerServiceWorker();
