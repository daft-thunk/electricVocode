'use strict';

import electron from 'electron';

// to change:
import { snippetsToDict } from './dictionary';

const interpreter = (speech, userSnippets, dictionary) => {
  console.log(speech);
  // add to our default dictionary
  console.log('>>>', snippetsToDict(userSnippets, dictionary));
  dictionary = snippetsToDict(userSnippets, dictionary);
  const speechWordsArray = speech.split(' ');
  let commandIdx = -1
  const commandWords = speechWordsArray
    .filter((word, i) => {
      const found = dictionary[word.toLowerCase()] !== undefined
      if (found && commandIdx === -1) commandIdx = i
      return found
    }
  );
  // while (commandWords.length) {
  if (commandIdx > -1) {
    const currCommand = commandWords[0].toLowerCase(); // get first word
    electron.ipcRenderer.send('successCommand', currCommand);

    // const speechWordsArray = speech.split(' ').map(word => word.toLowerCase());

    return dictionary[currCommand](speechWordsArray.slice(commandIdx + 1));
  } else {
    electron.ipcRenderer.send('failCommand', 'command not found');
    console.error(`Command ${speech} not recognized`);
  }
  // }
};

export default interpreter;
