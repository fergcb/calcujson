import { BooleanComputation, ComputationFactory, IntegerComputation, NumberComputation, StringComputation, SumComputation } from '..'
import { MapStore, ComputationTypeError } from '../..'

describe('Factory selects correct types', () => {
  let store: MapStore, cf: ComputationFactory

  beforeAll(() => {
    store = new MapStore()
    cf = new ComputationFactory(store)
  })

  test('bool', () => {
    const computable = {
      type: 'bool',
      value: true
    }

    expect(cf.create(computable))
      .toBeInstanceOf(BooleanComputation)
  })

  test('int', () => {
    const computable = {
      type: 'int',
      value: 10
    }

    expect(cf.create(computable))
      .toBeInstanceOf(IntegerComputation)
  })

  test('num', () => {
    const computable = {
      type: 'num',
      value: 4.2
    }

    expect(cf.create(computable))
      .toBeInstanceOf(NumberComputation)
  })

  test('str', () => {
    const computable = {
      type: 'str',
      value: 'foo'
    }

    expect(cf.create(computable))
      .toBeInstanceOf(StringComputation)
  })

  test('sum', () => {
    const computable = {
      type: 'sum',
      values: []
    }

    expect(cf.create(computable))
      .toBeInstanceOf(SumComputation)
  })

  test('invalid (throws error)', () => {
    const computable = {
      type: 'invalid'
    }

    expect(() => cf.create(computable))
      .toThrow(ComputationTypeError)
  })
})
