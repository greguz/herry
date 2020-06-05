declare class Herry<T = any> extends Error {
  static defaultCode: string
  static define<D = any> (code: String, message?: string): new (info?: D) => Herry<D>
  code: string
  info: T
  constructor (code?: string, message?: string, info?: any)
}

export = Herry
