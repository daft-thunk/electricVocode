import axios from 'axios';

const GET_SNIPPETS = 'GET_SNIPPETS';

const getSnippets = (snippets) => ({ type: GET_SNIPPETS, snippets });

export default function (state = [], action) {
  switch (action.type) {
    case GET_SNIPPETS:
      return snippets;
    default:
      return state;
  }
}

export const fetchUserSnippets = (userId) => dispatch => {
  axios.get(`http://localhost:8080/api/users/${userId}/snippets/`)
    .then(res => res.data)
    .then(snippets => {
      dispatch(getSnippets(snippets))
    })
    .catch(console.error)
};
