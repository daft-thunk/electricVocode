const reducer = `/**
 * ACTION TYPES
 */
const ACTION = 'ACTION'

/**
 * ACTION CREATORS
 */
const getAction = info => ({type: ACTION, info})

/**
 * THUNK CREATORS
 */
const Thunk = (args) =>
  dispatch =>
    /*ASYNC REQUEST*/
}

/**
 * REDUCER
 */

const defaultState = {
  hello: 'hello'
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case ACTION:
      return action.info
    default:
      return state
  }
}
`

export default reducer
