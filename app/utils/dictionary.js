'use strict';

import { component, store, reducer, express, stateless, html } from './templates';
import * as wordMethods from './wordMethods';

export const baseDictionary = {
  while: () => {
    return `while (Josh === Salty){\nreturn tear\n}`;
  },
  for: () => {
    return `for(let i = 0; i < array.length; i++){\n}`;
  },
  function: input => {
    return `const ${wordMethods.camelCaseWords(input)} = (args) => {}`;
  },
  string: input => {
    return `"${input.join(' ')}"`;
  },
  component: input => component(input),
  stateless: input => stateless(input),
  store: input => store(input),
  reducer: input => reducer(input),
  express: () => express,
  html: input => html(input)
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
    }
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
