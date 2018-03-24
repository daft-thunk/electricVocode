import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerReducer as router, routerMiddleware } from 'react-router-redux';
import decoder from './decoder';
import commands from './commands';
import user from './user';
import snippets from './snippets';
import dictionary from './dictionary';

const history = createBrowserHistory();
const historyRouter = routerMiddleware(history);
const reducers = combineReducers({decoder, commands, router, user, snippets, dictionary});
const enhancer = applyMiddleware(thunk, historyRouter);

function configureStore() {
  return createStore(reducers, enhancer);
}

export default { configureStore, history };
