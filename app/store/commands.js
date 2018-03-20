
const CMD = 'cmd';

export const cmdOutput = (input) => ({type: CMD, input})

export default function(state = [], action) {
  switch (action.type){
    case CMD:
      if (action.input) return [...state, action.input];
      else return state
    default:
      return state;
  }
}
