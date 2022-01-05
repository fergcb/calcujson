import Computable from '../../src/computables/Computable'
import Computation from '../../src/computations/Computation'
import Store from '../../src/Store'

class MockComputation extends Computation<Computable> {
  public evaluate (): undefined {
    return undefined
  }

  protected describe (): string {
    return 'default'
  }
}

describe('Computation', () => {
  let store: Store

  beforeEach(() => {
    store = new Store()
  })

  it('uses provided description', () => {
    const expectedDesc = 'foo'

    const computation = new MockComputation(store, {
      type: 'mock',
      desc: expectedDesc,
    })

    expect(computation.desc).toBe(expectedDesc)
  })

  it('defaults to description from .describe()', () => {
    const computation = new MockComputation(store, {
      type: 'mock',
    })

    expect(computation.desc).toBe('default')
  })
})
