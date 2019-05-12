import config from '../../config'
import telegram from '../telegram'

export const SEND_CODE = 'SEND_CODE';
export const RECEIVED_CODE_HASH = 'RECEIVED_CODE_HASH';
export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTHENTICATED = 'AUTHENTICATED';

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
    phone_number: phone.num,
    phone_code_hash,
    phone_code: code,
    // first_name: 'Taras',
    // last_name: 'Labiak'
  })

  dispatch({
    type: AUTHENTICATED,
    payload: response
  });
}
