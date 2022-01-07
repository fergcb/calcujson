import Store from '../../src/Store'
import GetComputation from '../../src/computations/GetComputation'

describe('GetComputation', () => {
  describe('with valid path', () => {
    const testValue = 42
    const testPath = 'foo.bar'
    let computation

    beforeEach(() => {
      const store = new Store({ foo: { bar: testValue } })
      computation = new GetComputation(store, {
        type: 'get',
        path: testPath,
      })
    })

    it('gets an existing value by path', () => {
      expect(computation.evaluate()).toBe(testValue)
    })

    it('is described by the given path', () => {
      expect(computation.desc).toBe(testPath)
    })
  })

  describe('with invalid path', () => {
    const testValue = 'baz'
    const testPath = 'invalid.path'
    let store

    beforeEach(() => {
      store = new Store()
    })

    it('uses a fallback value if given', () => {
      const computation = new GetComputation(store, {
        type: 'get',
        path: testPath,
        fallback: testValue,
      })

      expect(computation.evaluate()).toBe(testValue)
    })

    it('throws error when evaluating without a fallback value', () => {
      const computation = new GetComputation(store, {
        type: 'get',
        path: 'invalid.path',
      })

      expect(() => computation.evaluate()).toThrowError()
    })
  })
})
