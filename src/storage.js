const PREFIX = 'mt_';

window._getState = function () {
  const object = {}
  for(const key in localStorage) {
    if (key.indexOf('dc') === 0) {
      object[key] = localStorage.getItem(key)
    }
  }
  return JSON.stringify(object)
}

window._setState = function(object) {
  if ('string' === typeof object) {
    object = JSON.parse(object)
  }
  for(const key in object) {
    localStorage.setItem(key, object[key])
  }
}

export default {
  async get(key) {
    try {
      return JSON.parse(localStorage.getItem(PREFIX + key))
    }
    catch (err) {
      console.error(`Cannot get ${key}`)
    }
  },

  async set(key, value) {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  },

  async remove(key) {
    localStorage.remove(PREFIX + key)
  },

  async clear() {
    for(const key in localStorage) {
      if (key.indexOf(PREFIX) === 0) {
        localStorage.removeItem(PREFIX + key)
      }
    }
  }
}
