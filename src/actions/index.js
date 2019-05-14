import config from '../../config'
import telegram from '../telegram'

export const SEND_CODE = 'SEND_CODE';
export const RECEIVED_CODE_HASH = 'RECEIVED_CODE_HASH';
export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTHENTICATED = 'AUTHENTICATED';
export const REQUEST_DIALOGS = 'REQUEST_DIALOGS';
export const RECEIVED_DIALOGS = 'DIALOGS_RECEIVED';
export const REQUEST_DIALOGS_ERROR = 'REQUEST_DIALOGS_ERROR';

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
  // throw new Error('Auth');
}
