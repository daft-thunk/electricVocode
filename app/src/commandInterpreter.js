const commands = {
  loop: () => {
    //returns for loop
  },
  string: () => {
    //returns some string, based on next words
  },

}

const interpreter = (phrase) => {
  let wordArr = phrase.split(' ');
  let commandWords = wordArr.filter(word => commands[word] !== null);

  return commandWords;
}

module.exports = interpreter;
