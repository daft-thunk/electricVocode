import axios from 'axios';
import serverUrl from '../utils/serverUrl';

const GET_SNIPPETS = 'GET_SNIPPETS';
const REMOVE_SNIPPET = 'REMOVE_SNIPPET';
const ADD_SNIPPET = 'ADD_SNIPPET';

const getSnippets = (snippets) => ({ type: GET_SNIPPETS, snippets });
const removeSnippet = (snippetId) => ({type: REMOVE_SNIPPET, snippetId});
const addSnippet = (snippet) => ({ type: ADD_SNIPPET, snippet });

export default function (state = [], action) {
  switch (action.type) {
    case GET_SNIPPETS:
      return action.snippets;
    case REMOVE_SNIPPET:
      return state.filter(snippet => snippet.id !== action.snippetId);
    case ADD_SNIPPET:
      return [action.snippet, ...state];
    default:
      return state;
  }
}

export const fetchUserSnippets = (userId) => dispatch => {
  axios.get(`${serverUrl}/api/users/${userId}/snippets/all`)
    .then(res => res.data)
    .then(snippets => {
      dispatch(getSnippets(snippets));
    })
    .catch(console.error);
};

export const postNewSnippet = (snippetObj) => dispatch => {
  //snippetObj: {userId, command, code, description}
  //{creatorId: req.body.userId, command: req.body.command, code: req.body.code}
  axios.post(`${serverUrl}/api/snippet/`, snippetObj)
    .then(res => res.data)
    .then(snippet => {
      dispatch(addSnippet(snippet));
    })
    .catch(console.error);
};

export const removeUserSnippetConnection = (userId, snippetId) => dispatch => {
  axios.delete(`http://localhost:8080/api/users/${userId}/snippet/${snippetId}`)
    .then(res => res.status)
    .then(status => {
      console.log(status);
      dispatch(removeSnippet(snippetId))
    })
    .catch(console.error)
};

export const addUserSnippetConnection = (userId, snippetId) => dispatch => {
  axios.post(`http://localhost:8080/api/users/${userId}/snippets/${snippetId}`)
    .then(res => res.data)
    .then(snippets => {
      dispatch(getSnippets(snippets));
    })
    .catch(console.error);
};
