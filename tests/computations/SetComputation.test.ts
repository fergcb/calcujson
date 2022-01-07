import Store from '../../src/Store'
import SetComputation from '../../src/computations/SetComputation'

describe('SetComputation', () => {
  const testPath = 'foo.bar'
  const testValue = 42
  let computation: SetComputation
  let store: Store

  beforeEach(() => {
    store = new Store({})
    computation = new SetComputation(store, {
      type: 'set',
      path: testPath,
      value: {
        type: 'num',
        value: testValue,
      },
    })
  })

  it('stores and returns the child value', () => {
    expect(computation.evaluate()).toBe(testValue)
    expect(store.has(testPath)).toBe(true)
    expect(store.get(testPath)).toBe(testValue)
  })

  it('is described with the walrus operator', () => {
    expect(computation.desc).toBe(`${testPath} := ${testValue}`)
  })
})
