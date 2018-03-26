'use strict';
import electron from 'electron';
import { snippetsToDict } from './dictionary';


const onSuccess = (phrase) => {
  return new Notification('Hurd ya fam', { body: phrase + ' macro copied to clipboard'});
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
