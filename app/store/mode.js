const modeEnum = Object.freeze({none: -1, sandbox: 0, edit: 1, add: 2});

const SET_MODE = 'SET_MODE';

export const setMode = (mode) => ({type: SET_MODE, mode: modeEnum[mode]});

export default function(state = -1, action) {
  switch (action.type) {
    case SET_MODE:
      return action.mode;
    default:
      return -1;
  }
}
