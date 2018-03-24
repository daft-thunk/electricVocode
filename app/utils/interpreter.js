import electron from 'electron';
import dictionary from './dictionary';
import path from 'path';

const onSuccess = (phrase) => {
  return new Notification('Hurd ya fam', { body: phrase });
};

const onFail = (phrase) => {
  return new Notification(`Sorry I don't know that one, this is Josh's fault`, { body: phrase });
};

const interpreter = speech => {
  console.log(speech);
  const commandWords = speech
    .split(' ')
    .filter(word => dictionary[word.toLowerCase()] !== undefined);
  // while (commandWords.length) {
  if (commandWords.length) {
    const currCommand = commandWords[0].toLowerCase(); // get first word
    const speechWordsArray = speech.split(' ').map(word => word.toLowerCase());
    const commandIdx = speechWordsArray.indexOf(currCommand);
    onSuccess(currCommand);
    return dictionary[currCommand](speechWordsArray.slice(commandIdx + 1));
  } else {
    onFail(speech);
    console.error(`Command ${speech} not recognized`);
  }
  // }
};

export default interpreter;
