'use strict';

import electron from 'electron';

// to change:
import dictionary, { snippetsToDict } from './dictionary';

const interpreter = (speech, userSnippets) => {
  console.log(speech);
  // add to our default dictionary
  console.log('>>>', snippetsToDict(userSnippets, dictionary))
  dictionary = snippetsToDict(userSnippets, dictionary);
  const commandWords = speech
    .split(' ')
    .filter(word => dictionary[word.toLowerCase()] !== undefined);
  // while (commandWords.length) {
  if (commandWords.length) {
    const currCommand = commandWords[0].toLowerCase(); // get first word
    electron.ipcRenderer.send('successCommand', currCommand);

    const speechWordsArray = speech.split(' ').map(word => word.toLowerCase());
    const commandIdx = speechWordsArray.indexOf(currCommand);

    return dictionary[currCommand](speechWordsArray.slice(commandIdx + 1));
  } else {
    electron.ipcRenderer.send('failCommand', 'command not found');
    console.error(`Command ${speech} not recognized`);
  }
  // }
};

export default interpreter;
