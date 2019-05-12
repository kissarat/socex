const PREFIX = 'mtproto_';

export default {
  async get(key) {
    return localStorage.getItem(PREFIX + key)
  },

  async set(key, value) {
    localStorage.setItem(PREFIX + key, value)
  },

  async remove(key) {
    localStorage.remove(PREFIX + key)
  },

  async clear() {
    for(const key in localStorage) {
      if (key.indexOf(PREFIX) === 0) {
        localStorage.removeItem(key)
      }
    }
  }
}
