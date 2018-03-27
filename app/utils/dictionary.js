'use strict';

import { component, store, reducer, express, stateless, html, css, webpack } from './templates';
import * as wordMethods from './wordMethods';
import { history } from '../store/user';
import { ipcRenderer } from 'electron';

export const baseDictionary = {
  while: () => {
    return `while (Josh === Salty){\nreturn tear\n}`;
  },
  for: () => {
    return `for(let i = 0; i < array.length; i++){\n}`;
  },
  function: input => {
    if (input.length) {
      input = wordMethods.camelCaseWords(input);
    } else {
      input = 'myFunc';
    }
    return `const ${input} = (args) => {}`;
  },
  string: input => {
    if (!input.length) {
      input = ['my', 'string'];
    }
    return `"${input.join(' ')}"`;
  },
  component: input => component(input),
  stateless: input => stateless(input),
  store: input => store(input),
  reducer: input => reducer(input),
  express: () => express,
  html: input => html(input),
  css: () => css,
  webpack: () => webpack,
  /* Pretty please put webviews into the urlDictionary below */
};

export const urlDictionary = {
  //could make this a 'show' command followed by website wildcard eg show *github* show *stackoverflow*
  github: () => {
    history.push(`/webView/github.com`);
    ipcRenderer.send('popUp');
  },
  stackoverflow: () => {
    history.push(`/webView/stackoverflow.com`);
    ipcRenderer.send('popUp');
  },
  waffle: () => {
    history.push(`/webview/waffle.io`);
    ipcRenderer.send('popUp');
  },
  learn: () => {
    history.push('/webview/fullstackacademy.com');
    ipcRenderer.send('popUp');
  }
};

export const alternatesDictionary = {
  plurals: ['component', 'function'],
  misheard: [
    {
      for: ['4']
    },
    {
      while: ['wall']
    },
    {
      reducer: ['producer']
    },
    {github: ['it hub']}
  ]
};

// ADD ALTERNATE INTERPRETATIONS
export const addAlternates = (alternates, dictionary) => {
  const newDictionary = { ...dictionary };
  const alternatesKeys = Object.keys(alternates);
  for (let alternate of alternatesKeys) {
    if (alternate === 'plurals') {
      alternates[alternate].forEach(word => {
        newDictionary[word + 's'] = newDictionary[word];
      });
    } else if (alternate === 'misheard') {
      alternates[alternate].forEach(wordObj => {
        let keyWord = Object.keys(wordObj)[0];
        wordObj[keyWord].forEach(word => {
          newDictionary[word] = newDictionary[keyWord];
        });
      });
    }
  }
  return newDictionary;
};

const dictionary = addAlternates(alternatesDictionary, baseDictionary);

export default dictionary;

export const snippetsToDict = (snippetsArray, dict) => {
  const newDict = { ...dict };
  snippetsArray.forEach(snippet => {
    if (urlDictionary[snippet.command]) {
      newDict[snippet.command] = () => {
        history.push(`/webView/${snippet.code}`);
        ipcRenderer.send('popUp');
      };
    } else {
      newDict[snippet.command] = () => `${snippet.code}`;
    }
  });
  return newDict;
};
