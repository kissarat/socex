import config from '../../config'
import telegram from '../telegram'

export const SEND_CODE = 'SEND_CODE';
export const RECEIVED_CODE_HASH = 'RECEIVED_CODE_HASH';
export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTHENTICATED = 'AUTHENTICATED';

export const REQUEST_DIALOGS = 'REQUEST_DIALOGS';
export const RECEIVED_DIALOGS = 'RECEIVED_DIALOGS';
export const REQUEST_DIALOGS_ERROR = 'REQUEST_DIALOGS_ERROR';

export const REQUEST_HISTORY = 'REQUEST_HISTORY';
export const RECEIVED_HISTORY = 'RECEIVED_HISTORY';
export const REQUEST_HISTORY_ERROR = 'REQUEST_HISTORY_ERROR';

function save(name, value) {
  localStorage.setItem(name, JSON.stringify(value))
}

export async function sendCode(dispatch, phone) {
  dispatch({
    type: SEND_CODE,
    payload: phone
  });

  const {phone_code_hash} = await telegram('auth.sendCode', {
    phone_number: phone,
    current_number: false,
    api_id: config.id,
    api_hash: config.hash
  })

  dispatch({
    type: RECEIVED_CODE_HASH,
    payload: phone_code_hash
  });
}


export async function authenticate(dispatch, phone, phone_code_hash, code) {
  dispatch({
    type: AUTHENTICATE,
    payload: code
  });

  const response = await telegram('auth.signIn', {
    phone_number: phone,
    phone_code_hash,
    phone_code: code
  })
  dispatch({
    type: AUTHENTICATED,
    payload: response
  });
  save('signIn', response)
}

export async function fetchDialogs(dispatch) {
  dispatch({
    type: REQUEST_DIALOGS
  });

  try {
    const response = await telegram('messages.getDialogs', {})
    save('getDialogs', response)

    dispatch({
      type: RECEIVED_DIALOGS,
      payload: response
    });
  }
  catch (err) {
    console.error(err)
    dispatch({
      type: REQUEST_DIALOGS_ERROR,
      payload: err
    });
  }
}

export async function fetchHistory(dispatch, peer) {
  console.log(peer)
  dispatch({
    type: REQUEST_HISTORY
  });

  try {
    const response = await telegram('messages.getHistory', {peer})
    save('getHistory', response)

    dispatch({
      type: RECEIVED_HISTORY,
      payload: response
    });
  }
  catch (err) {
    console.error(err)
    dispatch({
      type: REQUEST_HISTORY_ERROR,
      payload: err
    });
  }
}
