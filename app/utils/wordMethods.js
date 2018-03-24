'use strict';

const titlecaseOneWord = word =>
  word[0].toUpperCase() + word.slice(1).toLowerCase();

export const camelCaseWords = wordArray =>
  wordArray
    .map((word, i) => {
      if (i === 0) return word.toLowerCase();
      return titlecaseOneWord(word);
    })
    .join('');

export const pascalCaseWords = wordArray =>
  wordArray
    .map(word => {
      return titlecaseOneWord(word);
    })
    .join('');

export const upperUnderscoreWords = wordArray =>
  wordArray
    .map(word => {
      return word.toUpperCase();
    })
    .join('_');

export const uppercaseWords = wordArray =>
  wordArray
    .map(word => {
      return word.toUpperCase();
    })
    .join(' ');

export const lowercaseWords = wordArray =>
  wordArray.map(word => word.toLowerCase()).join(' ');

export const titlecaseWords = wordArray =>
  wordArray
    .map(word => {
      return titlecaseOneWord(word);
    })
    .join(' ');
