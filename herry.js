let defaultCode = ''

function noEnum (object, property, value) {
  Object.defineProperty(object, property, {
    configurable: true,
    enumerable: false,
    value,
    writable: true
  })
}

module.exports = class Herry extends Error {
  static get defaultCode () {
    return defaultCode || 'HERRY'
  }

  static set defaultCode (code) {
    defaultCode = code
  }

  static define (code, message) {
    return class DefinedHerry extends Herry {
      constructor (info) {
        super(code, message, info)
      }
    }
  }

  constructor (code = Herry.defaultCode, message = '', info = {}) {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
    noEnum(this, 'name', `Error [${code}]`)
    noEnum(this, 'code', code)
    noEnum(this, 'info', info)
  }

  toJSON () {
    return {
      code: this.code,
      message: this.message,
      info: this.info
    }
  }
}
