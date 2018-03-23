import axios from 'axios';

const GET_SNIPPETS = 'GET_SNIPPETS';
const REMOVE_SNIPPET = 'REMOVE_SNIPPET';

const getSnippets = (snippets) => ({ type: GET_SNIPPETS, snippets });
const removeSnippet = (snippetId) => ({type: REMOVE_SNIPPET, snippetId})

export default function (state = [], action) {
  switch (action.type) {
    case GET_SNIPPETS:
      return action.snippets;
    case REMOVE_SNIPPET:
      return state.filter(snippet => snippet.id !== action.snippetId);
    default:
      return state;
  }
}

export const fetchUserSnippets = (userId) => dispatch => {
  axios.get(`http://localhost:8080/api/users/${userId}/snippets/all`)
    .then(res => res.data)
    .then(snippets => {
      dispatch(getSnippets(snippets))
    })
    .catch(console.error)
};

export const removeUserSnippetConnection = (userId, snippetId) => dispatch => {
  axios.delete(`http://localhost:8080/api/users/${userId}/snippet/${snippetId}`)
    .then(res => res.status)
    .then(status => {
      console.log(status);
      dispatch(removeSnippet(snippetId))
    })
    .catch(console.error)
}
