'use strict';
import electron from 'electron';
import { snippetsToDict, urlDictionary } from './dictionary';


const onSuccess = (phrase) => {
  return new Notification('Command recognized!', { body: phrase });
};

const onFail = (phrase) => {
  return new Notification(`Sorry I don't know that one.`, { body: phrase });
};

const interpreter = (speech, userSnippets, dictionary) => {
  // add to our default dictionary
  dictionary = snippetsToDict(userSnippets, dictionary, urlDictionary);
  const speechWordsArray = speech.split(' ');
  let commandIdx = -1;
  const commandWords = speechWordsArray
    .filter((word, i) => {
      const found = dictionary[word.toLowerCase()] !== undefined;
      if (found && commandIdx === -1) commandIdx = i;
      return found;
    }
  );
  if (commandIdx > -1) {
    const currCommand = commandWords[0].toLowerCase();

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
