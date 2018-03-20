import { component, store, reducer, express } from './templates'

export const dictionary = {
  'while': () => {
    return 'while (Josh === Salty){\nreturn tear\n}'
  },
  'for': () => {
    return 'for(let i = 0; i < array.length; i++){\n}'
  },
  'function': (input) => {
    return `const funcName = (args) => {}`
  },
  'string': (input) => {
    return `"${input.slice(7)}"`
  },
  'component': () => component,
  'store': () => store,
  'reducer': () => reducer,
  'express': () => express
}

const interpreter = (speech) => {
  console.log(speech)
  let commandWords = speech.split(' ').filter(word => dictionary[word] !== undefined)
  let currCommand;
  // while (commandWords.length) {
    currCommand = commandWords.shift();
    if (dictionary[currCommand]) return dictionary[currCommand](speech);
    else console.error(`Command ${speech} not recognized`)
  // }
}

export default interpreter;



