
export const camelCaseWords = wordArray =>
  wordArray
    .map((word, i) => {
      if (i === 0) return word.toLowerCase();
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');

export const pascalCaseWords = wordArray =>
  wordArray
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');

export const upperUnderscoreWords = wordArray =>
  wordArray
    .map((word) => {
      return word.toUpperCase();
    })
    .join('_');

export const uppercaseWords = wordArray =>
  wordArray
    .map((word) => {
      return word.toUpperCase();
    })
    .join(' ');
