import axios from 'axios';
import serverUrl from '../utils/serverUrl';

const GET_ALL_SNIPPETS = 'GET_ALL_SNIPPETS';


const getAllSnippets = (snippets) => ({ type: GET_ALL_SNIPPETS, snippets });


export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_SNIPPETS:
      return action.snippets;
    default:
      return state;
  }
}

export const fetchAllUserSnippets = () => dispatch => {
  axios.get(`${serverUrl}/api/snippet/`)
    .then(res => res.data)
    .then(snippets => {
      dispatch(getAllSnippets(snippets));
    })
    .catch(console.error);
};
