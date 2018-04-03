const SET_SNIPPET = 'SET_SNIPPET';

export const setSnippet = (snippet) => ({type: SET_SNIPPET, snippet});

export default function (state = {}, action) {
  switch (action.type) {
    case SET_SNIPPET:
      return action.snippet;
    default:
      return state;
  }
}
