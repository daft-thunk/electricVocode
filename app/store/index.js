// @flow
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
// import {composeWithDevTools} from 'redux-devtools-extension';
import { routerReducer as router, routerMiddleware, routerActions } from 'react-router-redux';
import { createHashHistory, createBrowserHistory, createMemoryHistory } from 'history';
import decoder from './decoder';
import commands from './commands';
import user, {history} from './user';
import snippets from './snippets';
import mode from './mode';
import currSnippet from './currSnippet';
import allSnippets from './allSnippets';


const reducer = combineReducers({decoder, commands, user, router, snippets, mode, currSnippet, allSnippets});
//const history = createMemoryHistory();

const configureStore = (initialState = {}) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunkMiddleware);

   // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Router Middleware
  const historyRouter = routerMiddleware(history);
  middleware.push(historyRouter);

  // Redux DevTools Configuration
  const actionCreators = {
   // ...counterActions,
    ...routerActions,
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  const store = createStore(reducer, initialState, enhancer);

  return store;
};

export default {configureStore, history};
export * from './decoder';
export * from './commands';
export * from './user';
export * from './snippets';
export * from './allSnippets';
