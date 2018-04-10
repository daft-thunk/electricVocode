import { titlecaseWords } from '../wordMethods';
import { validate } from '../dictionary';

const html = input => {
  input = validate(input) ? titlecaseWords(input) : 'Title';
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${input}</title>
  </head>
  <body>
    <h1>${input}</h1>
  </body>
  </html>`;
};

export default html;
