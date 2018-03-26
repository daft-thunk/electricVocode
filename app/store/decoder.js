import axios from 'axios';
import interpreter from '../utils/interpreter';
import electron, { clipboard } from 'electron';
import { cmdOutput } from './commands';

const ADD = 'add';

export const addOutput = (snippet) => ({type: ADD, snippet});

export const addOutputThunk = (base64data, userSnippets, dictionary) => {
  return dispatch => {
    axios.post('https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyBxs-oE9FfcxdCeLOgxP6Ia_ufy8QzijN0', {
      config: {
       encoding: 'LINEAR16',
       sampleRateHertz: 44100,
       languageCode: 'en-US',
       speechContexts: {
        phrases: ['github', 'stackoverflow']
      }
     },
     audio: {
       content: base64data
     }
  }).then(res => {
    console.log(res.data);// keep
    // console.log('decoder: u / d', userSnippets, dictionary)
    const parsed = res.data.results ? res.data.results[0].alternatives[0].transcript : null;
    if (!parsed) return new Notification(`No input was registered.`);
    const interpreted = interpreter(parsed, userSnippets, dictionary);
    if (interpreted) {
      clipboard.writeText(interpreted);
      dispatch(addOutput(interpreted));
    }
    dispatch(cmdOutput(parsed));
  });
  };
};


export default function(state = [], action) {
  switch (action.type){
    case ADD:
      return [...state, action.snippet];
    default:
      return state;
  }
}

