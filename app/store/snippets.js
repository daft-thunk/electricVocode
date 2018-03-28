import axios from 'axios';
import serverUrl from '../utils/serverUrl';

const GET_SNIPPETS = 'GET_SNIPPETS';
const REMOVE_SNIPPET = 'REMOVE_SNIPPET';
const ADD_SNIPPET = 'ADD_SNIPPET';
const EDIT_SNIPPET = 'EDIT_SNIPPET';

const getSnippets = (snippets) => ({ type: GET_SNIPPETS, snippets });
const removeSnippet = (snippetId) => ({type: REMOVE_SNIPPET, snippetId});
const addSnippet = (snippet) => ({ type: ADD_SNIPPET, snippet });
const editSnippet = (snippet) => ({ type: EDIT_SNIPPET, snippet });

export default function (state = [], action) {
  switch (action.type) {
    case GET_SNIPPETS:
      return action.snippets;
    case REMOVE_SNIPPET:
      return state.filter(snippet => snippet.id !== action.snippetId);
    case ADD_SNIPPET:
      return [action.snippet, ...state];
    case EDIT_SNIPPET:
      return [action.snippet, ...state.filter(oldSnippet => oldSnippet.id !== action.snippet.id)]
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

export const postNewSnippet = (snippetObj, oldSnippetId) => dispatch => {
  //snippetObj: {userId, command, code}
  //{creatorId: req.body.userId, command: req.body.command, code: req.body.code}
  axios.post(`${serverUrl}/api/snippet/`, snippetObj)
    .then(res => res.data)
    .then(snippet => {
      dispatch(addUserSnippetConnection(snippetObj.userId, snippet.id))
      dispatch(addSnippet(snippet));
    })
    .then(() => {
      if (oldSnippetId) {
        console.log(oldSnippetId, 'old snippet ID')
        dispatch(removeUserSnippetConnection(snippetObj.userId, oldSnippetId));
      }
    })
    .catch(console.error);
};

export const removeUserSnippetConnection = (userId, snippetId) => dispatch => {
  axios.delete(`${serverUrl}/api/users/${userId}/snippets/${snippetId}`)
    .then(res => res.status)
    .then(status => {
      console.log(status);
      dispatch(removeSnippet(snippetId));
    })
    .catch(console.error);
};

export const changeSnippet = (snippetId, code, command) => dispatch => {
  axios.put(`${serverUrl}/api/snippet/`, {id: snippetId, code, command})
    .then(res => res.data)
    .then(snippet => dispatch(editSnippet(snippet)))
    .catch(console.error);
}

export const addUserSnippetConnection = (userId, snippetId) => dispatch => {
  console.log(userId)
  axios.post(`${serverUrl}/api/users/${userId}/snippets/${snippetId}`)
    .then(res => res.data)
    .then(snippet => {
      console.log(snippet)
      dispatch(addSnippet(snippet));
    })
    .catch(console.error);
};
