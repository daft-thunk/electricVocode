import snippetsReducer, { getSnippets, removeSnippet, addSnippet, editSnippet, GET_SNIPPETS, REMOVE_SNIPPET, ADD_SNIPPET, EDIT_SNIPPET } from '../../app/store/snippets';

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

    test('Remove Snippet', () => {
      const snipId = 1;
      const removeAction = removeSnippet(snipId)
      expect(removeAction).toEqual({
        type: REMOVE_SNIPPET,
        snippetId: snipId
      })
    })

    test('Edit Snippet', () => {
      const snippet = { id: 1, code: '// This is a test', command: 'test' }
      const editAction = editSnippet(snippet)
      expect(editAction).toEqual({
        type: EDIT_SNIPPET,
        snippet
      })
    })
  })

  describe('Reducer state change', () => {
    let testStore
    beforeEach(() => {
      testStore = createStore(snippetsReducer);
    })

    test('initial state is empty', () => {
      const initial = testStore.getState();
      expect(initial).toEqual([])
    })

    test('dispatching addSnippet adds a snippet', () => {
      const snippet = { id: 1, code: '// This is a test', command: 'test' };
      testStore.dispatch(addSnippet(snippet));

      const addState = testStore.getState();
      expect(addState).toEqual([snippet]);
    })

    test('dispatch getSnippets loads in list of snippets', () => {
      const snippets = [{id: 1, code: 'a', command: 'x'}, {id: 2, code: 'b', command: 'y'}, {id: 3, code: 'c', command: 'z'}];
      testStore.dispatch(getSnippets(snippets))

      const getState = testStore.getState();
      expect(getState).toEqual(snippets);
    })

    test('dispatch removeSnippet removes a snippet', () => {
      const snippets = [{id: 1, code: 'a', command: 'x'}, {id: 2, code: 'b', command: 'y'}, {id: 3, code: 'c', command: 'z'}];
      testStore.dispatch(getSnippets(snippets));
      testStore.dispatch(removeSnippet(2));

      const removeState = testStore.getState();
      expect(removeState).toEqual([{id: 1, code: 'a', command: 'x'}, {id: 3, code: 'c', command: 'z'}])
    })

    test('editSnippet replaces old snippet in store', () => {
      const snippets = [{id: 1, code: 'a', command: 'x'}, {id: 2, code: 'b', command: 'y'}, {id: 3, code: 'c', command: 'z'}];
      testStore.dispatch(getSnippets(snippets));
      testStore.dispatch(editSnippet({id: 2, code: 'j', command: 'm'}));

      const editState = testStore.getState();
      expect(editState).toEqual([{id: 2, code: 'j', command: 'm'}, {id: 1, code: 'a', command: 'x'}, {id: 3, code: 'c', command: 'z'}])
    })


  })

  describe('Thunk actions ')

})
