# You're a problem, Herry.

[![npm version](https://badge.fury.io/js/herry.svg)](https://badge.fury.io/js/herry)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Sometimes something went wrong, and you have to communicate **what** went wrong. Herry is a tiny library that exposes a slightly extended error class with a `code` property.

The first constructor argument is the error code, the second argument is the error message, and the last argument is additional information. All arguments are optional.

```javascript
const Herry = require('herry')

const err = new Herry('MY_CODE', 'My message', {
  my: 'very',
  detailed: 'info'
})

console.log(err instanceof Error) // true
console.log(err instanceof Herry) // true

console.log(err)
// Error [MY_CODE]: My message
//     at Object.<anonymous> (script.js:3:13)

console.log(err.code)     // MY_CODE
console.log(err.message)  // My message
console.log(err.info)     // { my: 'very', ... }
```

JSON serialization is also supported.

```javascript
const Herry = require('herry')

const err = new Herry('MY_CODE', 'My message')

console.log(JSON.stringify(err))
// { code: 'MY_CODE', message: 'My message' }
```

## Define custom errors

Calling the `define` static method will return a **constructor** with code and message arguments already bound internally.

```javascript
const Herry = require('herry')

const UnauthorizedError = Herry.define(
  'HTTP_UNAUTHORIZED',
  'Authentication is required for this resource'
)

const err = new UnauthorizedError({ resource: 'orders' })

console.log(err instanceof Error)             // true
console.log(err instanceof Herry)             // true
console.log(err instanceof UnauthorizedError) // true

console.log(err.code)     // HTTP_UNAUTHORIZED
console.log(err.message)  // Authentication is...
console.log(err.info)     // { resource: 'orders' }
```

## Change default error code

It is possible to change the default error code by assigning the static property `defaultCode`.

```javascript
const Herry = require('herry')

const firstError = new Herry()
console.log(firstError.code) // HERRY

Herry.defaultCode = 'KABOOM'

const secondError = new Herry()
console.log(secondError.code) // KABOOM
```
