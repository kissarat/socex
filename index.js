const Telegram = require('telegram-mtproto')
const config = require('./config')
const {pretty} = require('auxiliary/utilities')
const repl = require('repl')
const fs = require('fs')
const user = require('./user');

const phone = {
  num: config.phone,
  code: '38034'
}

const api = {
  layer: 57,
  initConnection: 0x69796de9,
  api_id: 49631
}

const server = {
  dev: false //We will connect to the test server.
}           //Any empty configurations fields can just not be specified

const client = Telegram.MTProto({server, api})

async function main() {
  const {phone_code_hash} = await client('auth.sendCode', {
    phone_number: phone.num,
    current_number: false,
    api_id: config.id,
    api_hash: config.hash
  })
  console.log(phone_code_hash);

  repl.start({
    async eval(cmd) {
      const response = await client('auth.signIn', {
        phone_number: phone.num,
        phone_code_hash,
        phone_code: cmd.trim(),
        // first_name: 'Taras',
        // last_name: 'Labiak'
      })

      fs.writeFileSync('/tmp/kissarat.json', pretty(response));
      const dialogs = await client('messages.getDialogs');
      console.log(pretty(dialogs));
    }
  })
}

void main()
