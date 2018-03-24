'use strict';

import electron from 'electron';
import { snippetsToDict } from './dictionary';
// import path from 'path';

const onSuccess = (phrase) => {
  return new Notification('Hurd ya fam', { body: phrase });
};

const onFail = (phrase) => {
  return new Notification(`Sorry I don't know that one, this is Josh's fault`, { body: phrase });
};

const interpreter = (speech, userSnippets, dictionary) => {
  console.log(speech);
  // add to our default dictionary
  console.log('>>>', snippetsToDict(userSnippets, dictionary));
  dictionary = snippetsToDict(userSnippets, dictionary);
  const speechWordsArray = speech.split(' ');
  let commandIdx = -1;
  const commandWords = speechWordsArray
    .filter((word, i) => {
      const found = dictionary[word.toLowerCase()] !== undefined;
      if (found && commandIdx === -1) commandIdx = i;
      return found;
    }
  );
  // while (commandWords.length) {
  if (commandIdx > -1) {
    const currCommand = commandWords[0].toLowerCase(); // get first word

    // this triggers menu bar display: (not being used?)
    electron.ipcRenderer.send('successCommand', currCommand);

    const afterCommand = speechWordsArray.slice(commandIdx + 1);
    onSuccess(`▵${currCommand.toUpperCase()}▵ ${afterCommand.join(' ')}`);
    return dictionary[currCommand](afterCommand);
  } else {
    onFail(speech);
    console.error(`Command ${speech} not recognized`);
  }
  // }
};

export default interpreter;
