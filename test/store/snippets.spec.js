import { getSnippets, removeSnippet, addSnippet, editSnippet, GET_SNIPPETS, REMOVE_SNIPPET, ADD_SNIPPET, EDIT_SNIPPET } from '../../app/store/snippets'

import { createStore } from 'redux';

describe('Snippets Reducer', () => {
  describe('Action Creators', () => {

    test('Add Snippet', () => {
      const snippet = { id: 1, code: '// This is a test', command: 'test' }

      const addAction = addSnippet(snippet);
      expect(addAction).toEqual({
        type: ADD_SNIPPET,
        snippet
      })
    })

    test('Get Snippets', () => {
      const snippets = [{id: 1}, {id: 2}, {id: 3}];
      const getAction = getSnippets(snippets);
      expect(getAction).toEqual({
        type: GET_SNIPPETS,
        snippets
      })
    })
  })

})
