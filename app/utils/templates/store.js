const Store = (input) => {
  input = input.length ? input.join(', ') : 'myReducer';
  return `//npm install redux redux-logger redux-thunk redux-devtools-extension
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
//IMPORT REDUCERS
//import { ${input} } from '.'

const reducer = combineReducers({
  /*YOUR REDUCERS HERE*/
  //${input}
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store

//EXPORT REDUCER CONST AND FUNCTIONS
//export * from './reducerFile'
`;};

export default Store;
