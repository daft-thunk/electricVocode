import { component, store, reducer, express, stateless } from './templates';
import electron from 'electron';

export const baseDictionary = {
  while: () => {
    return `while (Josh === Salty){\nreturn tear\n}`;
  },
  for: () => {
    return `for(let i = 0; i < array.length; i++){\n}`;
  },
  function: input => {
    return `const funcName = (args) => {}`;
  },
  string: input => {
    return `"${input.slice(7)}"`;
  },
  component: () => component,
  store: () => store,
  reducer: () => reducer,
  express: () => express,
  stateless: () => stateless
};

export const alternatesDictionary = {
  plurals: ['component', 'function'],
  misheard: [
    {
      for: ['4']
    },
    {
      while: ['wall']
    }
  ]
};

// ADD ALTERNATE INTERPRETATIONS
export const addAlternates = (alternates, dictionary) => {
  const newDictionary = {...dictionary};
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

export const dictionary = addAlternates(alternatesDictionary, baseDictionary);


const interpreter = speech => {
  console.log(speech);
  let commandWords = speech
    .split(' ')
    .filter(word => dictionary[word.toLowerCase()] !== undefined);
  // while (commandWords.length) {
  if (commandWords.length) {
    // get first word:
    let currCommand = commandWords.shift().toLowerCase();
    electron.ipcRenderer.send('successCommand', currCommand);
    return dictionary[currCommand](speech);
  } else {
    electron.ipcRenderer.send('failCommand', 'command not found');
    console.error(`Command ${speech} not recognized`);
  }
  // }
};

export default interpreter;
