const snippetsToDict = (snippetsArray, dict) => {
  const newDict = { ...dict };
  snippetsArray.forEach(snippet => {
    newDict[snippet.command] = snippet.code;
  });
  return newDict;
};

/**
 * ACTION TYPES
 */
const RELOAD_DICTIONARY = 'RELOAD_DICTIONARY';

/**
 * ACTION CREATORS
 */
const reloadDictionary = snippets => ({ type: RELOAD_DICTIONARY, snippets });

/**
 * THUNK CREATORS
 */
const Thunk = args => dispatch => {
  /*ASYNC REQUEST*/
};

/**
 * REDUCER
 */

// const defaultState = pretendDict;

export default function(
  state = {
    loop: 'loop',
    number: 45
  },
  action
) {
  switch (action.type) {
    case RELOAD_DICTIONARY:
      // this function does not mutate state
      return snippetsToDict(action.snippets, state);
    default:
      return state;
  }
}
