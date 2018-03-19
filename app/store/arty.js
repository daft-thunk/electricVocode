import axios from 'axios'
import interpreter from '../../utils/interpreter'
const ADD = 'add';

export const addOutput = (snippet) => ({type: ADD, snippet});

export const addOutputThunk = (base64data) => {
  return dispatch => {
    axios.post('https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyBxs-oE9FfcxdCeLOgxP6Ia_ufy8QzijN0', {
      config: {
       encoding: 'LINEAR16',
       sampleRateHertz: 44100,
       languageCode: 'en-US'
     },
     audio: {
       content: base64data
     }
  }).then(res => {
    console.log(res.data)
    dispatch(addOutput(interpreter(res.data.results[0].alternatives[0].transcript)))
  })
  }
}


export default function(state = [], action) {
  switch (action.type){
    case ADD:
      return [...state, action.snippet];
    default:
      return state;
  }
}

