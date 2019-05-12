export const schema = {
  dev: 'boolean'
}

const settings = {}

const PREFIX = 'socex_'

Object.keys(schema).forEach(function (key) {
  const prefixed = PREFIX + key
  const type = schema[key]
  Object.defineProperty(settings, key, {
    configurable: false,
    get() {
      const value = localStorage.getItem(prefixed)
      switch (type) {
        case 'object':
          if (value) {
            try {
              return JSON.parse(value)
            }
            catch (e) {
              return {}
            }
          }
          else {
            return {}
          }
        case 'boolean':
          return '1' === value || 'true' === value
        case 'number':
          return +value
        default:
          return value
      }
    },
    set(value) {
      switch (type) {
        case 'object':
          if (value) {
            value = JSON.stringify(value)
          }
          else {
            localStorage.removeItem(prefixed)
          }
          break
        case 'boolean':
          value = value ? '1' : '0'
          break
      }
      localStorage.setItem(prefixed, value)
    }
  })
})

window.settings = settings

export default settings
