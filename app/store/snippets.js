import axios from 'axios';
import serverUrl from '../utils/serverUrl';

const GET_SNIPPETS = 'GET_SNIPPETS';
const ADD_SNIPPET = 'ADD_SNIPPET';

const getSnippets = (snippets) => ({ type: GET_SNIPPETS, snippets });
const addSnippet = (snippet) => ({ type: ADD_SNIPPET, snippet });

export default function (state = [], action) {
  switch (action.type) {
    case GET_SNIPPETS:
      return action.snippets;
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
  //snippetObj: {userId, command, code}
  //{creatorId: req.body.userId, command: req.body.command, code: req.body.code}
  axios.post(`${serverUrl}/api/snippet/`, snippetObj)
    .then(res => res.data)
    .then(snippet => {
      dispatch(addSnippet(snippet));
    })
    .catch(console.error);
};
