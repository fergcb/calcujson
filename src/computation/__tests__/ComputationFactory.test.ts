import { ComputationFactory, IntegerComputation } from '..'
import { MapStore, ComputationTypeError } from '../..'

describe('Factory selects correct types', () => {
  let store: MapStore, cf: ComputationFactory

  beforeAll(() => {
    store = new MapStore()
    cf = new ComputationFactory(store)
  })

  test('integer', () => {
    const computable = {
      type: 'integer',
      value: 10
    }

    expect(cf.create(computable))
      .toBeInstanceOf(IntegerComputation)
  })

  test('invalid (throws error)', () => {
    const computable = {
      type: 'invalid'
    }

    expect(() => cf.create(computable))
      .toThrow(ComputationTypeError)
  })
})
