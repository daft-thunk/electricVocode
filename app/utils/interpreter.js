import { component, store, reducer, express, stateless } from './templates';
import electron from 'electron';

export const dictionary = {
  while: () => {
    return `while (Josh === Salty){\nreturn tear\n}`;
  },
  for: () => {
    return `for(let i = 0; i < array.length; i++){\n}`;
  },
  function: (input) => {
    return `const funcName = (args) => {}`;
  },
  string: (input) => {
    return `"${input.slice(7)}"`;
  },
  component: () => component,
  store: () => store,
  reducer: () => reducer,
  express: () => express,
  stateless: () => stateless
};

const interpreter = (speech) => {
  console.log(speech);
  let commandWords = speech.split(' ').filter(word => dictionary[word.toLowerCase()] !== undefined);
  // while (commandWords.length) {
    if (commandWords.length){
      // get first word:
      let currCommand = commandWords.shift().toLowerCase();
      electron.ipcRenderer.send('successCommand', currCommand);
      return dictionary[currCommand](speech);
    }
    else {
      electron.ipcRenderer.send('failCommand', 'command not found');
      console.error(`Command ${speech} not recognized`);
    }
  // }
};

export default interpreter;

