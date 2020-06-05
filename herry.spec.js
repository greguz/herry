const test = require('ava')

const Herry = require('./herry')

test('basic', t => {
  const err = new Herry()
  t.true(err instanceof Error)
  t.true(err instanceof Herry)
  t.is(err.code, 'HERRY')
  t.is(err.message, '')
  t.deepEqual(err.info, {})
})

test('arguments', t => {
  const err = new Herry('HERRY_TEST', 'Oh No', { big: 'explosion' })
  t.true(err instanceof Error)
  t.true(err instanceof Herry)
  t.is(err.code, 'HERRY_TEST')
  t.is(err.message, 'Oh No')
  t.deepEqual(err.info, { big: 'explosion' })
})

test('define', t => {
  const TestError = Herry.define('HERRY_TEST', 'Oh No')
  const err = new TestError({ super: 'mario' })
  t.true(err instanceof Error)
  t.true(err instanceof Herry)
  t.true(err instanceof TestError)
  t.is(err.code, 'HERRY_TEST')
  t.is(err.message, 'Oh No')
  t.deepEqual(err.info, { super: 'mario' })
})

test('toJSON', t => {
  const err = new Herry('HERRY_TEST', 'Oh No', { big: 'explosion' })
  const obj = JSON.parse(JSON.stringify(err))
  t.deepEqual(obj, {
    code: 'HERRY_TEST',
    message: 'Oh No',
    info: {
      big: 'explosion'
    }
  })
})

test('defaultCode', t => {
  Herry.defaultCode = 'NOPE'
  const err = new Herry()
  t.true(err instanceof Error)
  t.true(err instanceof Herry)
  t.is(err.code, 'NOPE')
  t.is(err.message, '')
  t.deepEqual(err.info, {})
})
