import axios from 'axios';
import interpreter from '../utils/interpreter';
import electron, { clipboard } from 'electron';
import { cmdOutput } from './commands';
import googleSpeech from '../utils/googleSpeech';

const ADD = 'add';

export const addOutput = (snippet) => ({type: ADD, snippet});

export const addOutputThunk = (base64data, userSnippets, dictionary) => {
  return dispatch => {
    googleSpeech(base64data, userSnippets, dictionary)
    .then(res => {
    const parsed = res.data.results[0].alternatives[0].transcript;
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

