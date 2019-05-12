import {MTProto} from 'telegram-mtproto'
import config from '../config'
import storage from './storage'
import settings from './settings'

const api = {
  layer: 57,
  initConnection: 0x69796de9,
  api_id: config.id
}

const server = {
  dev: settings.dev //We will connect to the test server.
}           //Any empty configurations fields can just not be specified

const telegram = MTProto({
  server,
  api,
  app: { storage }
})

export default telegram
