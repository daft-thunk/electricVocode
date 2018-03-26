import axios from 'axios';

export default (file, userSnippets, dictionary) => {
return axios.post('https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyBxs-oE9FfcxdCeLOgxP6Ia_ufy8QzijN0', {
      config: {
       encoding: 'LINEAR16',
       sampleRateHertz: 44100,
       languageCode: 'en-US',
       speechContexts: {
        phrases: Object.keys(dictionary).concat(Object.keys(userSnippets))
      }
     },
     audio: {
       content: file
     }
  });
};

