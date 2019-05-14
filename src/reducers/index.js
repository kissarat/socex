import {combineReducers} from "redux"
import {AUTHENTICATED, AUTHENTICATE, RECEIVED_CODE_HASH, SEND_CODE,
  REQUEST_DIALOGS_ERROR, RECEIVED_DIALOGS} from '../actions'

function auth(state = {phone: ''}, action) {
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

const initialState = {
  messages: [],
  users: {},
  dialogs: null,
  chats: {}
}

function index(items) {
  const object = {}
  for(const item of items) {
    object[item.id] = item
  }
  return object
}

function entities(state = initialState, action) {
  switch (action.type) {
    case REQUEST_DIALOGS_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case RECEIVED_DIALOGS:
      return {
        dialogs: action.payload.dialogs,
        messages: action.payload.messages,
        chats: {
            ...state.chats,
            ...index(action.payload.chats)
        },
        users: {
            ...state.users,
            ...index(action.payload.users)
        }
      }
    default:
      return state
  }
}

export default combineReducers({entities, auth})
