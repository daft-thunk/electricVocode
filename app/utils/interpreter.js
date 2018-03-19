import { component, store, reducer } from './templates'

const commands = {
  'while': () => {
    return 'while (Josh === Salty){\nreturn tear\n}'
  },
  'for': () => {
    return 'for(let i = 0; i < array.length; i++){\n}'
  },
  'react': () => {
    return 'react'
  },
  'redux': () => {
    return 'redux'
  },
  'component': () => component,
  'store': () => store,
  'reducer': () => reducer
}

const interpreter = (speech) => {

  let commandWords = speech.split(' ').filter(word => commands[word] !== undefined)
  let currCommand;
  // while (commandWords.length) {
    currCommand = commandWords.shift();
    console.log(currCommand);
    return commands[currCommand]();
  // }
}

export default interpreter;
