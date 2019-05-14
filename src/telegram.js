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
  // dev: settings.dev
  dev: false
}

const telegram = MTProto({
  server,
  api,
  app: {
    debug: true,
    storage
  }
})

export default telegram
