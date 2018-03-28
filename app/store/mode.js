const modeEnum = Object.freeze({edit: 1, add: 2});

const SET_MODE = 'SET_MODE';

export const setMode = (mode) => ({type: SET_MODE, mode: modeEnum[mode]});

export default function(state = 2, action) {
  switch (action.type) {
    case SET_MODE:
      return action.mode;
    default:
      return state;
  }
}
