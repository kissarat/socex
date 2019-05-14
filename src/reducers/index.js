import {combineReducers} from "redux"
import {
  AUTHENTICATED, AUTHENTICATE, RECEIVED_CODE_HASH, SEND_CODE,
  REQUEST_DIALOGS_ERROR, RECEIVED_DIALOGS,
  RECEIVED_HISTORY
} from '../actions'

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
  chats: {},
  history: []
}

function index(items) {
  const object = {}
  for (const item of items) {
    object[item.id] = item
  }
  return object
}

function entities(state = initialState, action) {
  console.log(action.payload)
  switch (action.type) {
    case REQUEST_DIALOGS_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case RECEIVED_DIALOGS:
      return {
        ...state,
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
    case RECEIVED_HISTORY:
      return {
        ...state,
        history: action.payload.messages.sort((a, b) => a.id - b.id)
      }
    default:
      return state
  }
}

export default combineReducers({entities, auth})
