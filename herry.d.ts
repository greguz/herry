declare interface IHerry<T = any> {
  code: string
  message: string
  info: T
}

declare class Herry<T = any> extends Error implements IHerry<T> {
  static defaultCode: string
  static define (code: String, message?: string): new (info?: any) => Herry
  code: string
  info: T
  constructor (code?: string, message?: string, info?: any)
  toJSON (): IHerry<T>
}

export = Herry
