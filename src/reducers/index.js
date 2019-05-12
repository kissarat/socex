import {combineReducers} from "redux"
import {AUTHENTICATED, AUTHENTICATE, RECEIVED_CODE_HASH, SEND_CODE} from '../actions'

function phone(state = {phone: ''}, action) {
  switch (action.type) {
    case SEND_CODE:
      return {
        ...state,
        phone: action.payload
      }
    case RECEIVED_CODE_HASH:
      return {
        ...state,
        hash: action.payload
      }
    case AUTHENTICATE:
      return {
        ...state,
        code: action.payload
      }
    case AUTHENTICATED:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

function reducer(state = {}, action) {
  return state
}

export default combineReducers({reducer, phone})
