import axios from 'axios';
//import {history} from './index';
import serverUrl from '../utils/serverUrl';
import { createHashHistory, createBrowserHistory, createMemoryHistory } from 'history';
export const history = createMemoryHistory();

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
export const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch => {
    return axios.get(`${serverUrl}/auth/me`)
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err));
  };

export const auth = (email, password, method, firstName, lastName) =>
  dispatch =>
    axios.post(`${serverUrl}/auth/${method}`, { email, password, firstName, lastName })
      .then(res => {
        dispatch(getUser(res.data));
        history.push('/main');
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}));
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));

export const logout = () =>
  dispatch => {
    console.log('hiting logout')
    localStorage.clear();
    return axios.post(`${serverUrl}/auth/logout`)
      .then( () => {
        dispatch(removeUser());
        history.push('/login');
      })
      .catch(err => console.log(err));
  };

export const updateUser = (userId, data, type) => {
  return dispatch => {
    axios.put(`${serverUrl}/api/users/${userId}`, { [`${type}`]: data })
    .then(res => {
      console.log(res.data)
      dispatch(getUser(res.data));
    })
    .catch(err => console.log(err));
  }
}

export const updateURLS = (userId, githubURL, stackoverflowURL, waffleURL) => {
  return dispatch => {
    axios.put(`${serverUrl}/api/users/${userId}`, { githubURL, stackoverflowURL, waffleURL })
    .then(res => {
      console.log(res.data)
      dispatch(getUser(res.data));
    })
    .catch(err => console.log(err));
  }
}

export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
}
