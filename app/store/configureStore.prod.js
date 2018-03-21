import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import type { counterStateType } from '../reducers/counter';
import decoder from './decoder';
import commands from './commands'
import { routerReducer as router, routerMiddleware } from 'react-router-redux';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);
const reducer = combineReducers({decoder, commands, router});

function configureStore() {
  return createStore(reducer, enhancer);
}

export default { configureStore, history };
