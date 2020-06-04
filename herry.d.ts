class Herry extends Error {
  static defaultCode: string
  static define (code: String, message?: string): Constructor<DefinedHerry>
  code: string
  info: any
  constructor (code?: string, message?: string, info?: any)
}

class DefinedHerry extends Herry {
  constructor (info?: any)
}

type Constructor<T extends Function> = new (...args: ConstructorParameters<T>) => T

export = Herry
