'use strict';

import { component, store, reducer, express, stateless, html, css, webpack } from './templates';
import * as wordMethods from './wordMethods';
import electron from 'electron';

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
  /* Pretty please put external links into the urlDictionary below */
};

export const urlDictionary = {
  //could make this a 'show' command followed by website wildcard eg "show *github*" or "show *stackoverflow*"
  github: () => {
    electron.shell.openExternal('http://github.com');
  },
  stackoverflow: () => {
    electron.shell.openExternal('http://stackoverflow.com');
  },
  waffle: () => {
    electron.shell.openExternal('http://waffle.io');
  },
  learn: () => {
    electron.shell.openExternal('http://fullstackacademy.com');
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

const dictionary = addAlternates(alternatesDictionary, {...baseDictionary, ...urlDictionary});

export default dictionary;

export const snippetsToDict = (snippetsArray, dict, urlDict) => {
  const newDict = { ...dict };
  snippetsArray.forEach(snippet => {
    if (urlDict[snippet.command]) {
      newDict[snippet.command] = () => {
       electron.shell.openExternal(`http://${snippet.code}`);
      };
    } else {
      newDict[snippet.command] = () => `${snippet.code}`;
    }
  });
  return newDict;
};
