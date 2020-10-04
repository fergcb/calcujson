import { BooleanComputation } from '..'
import { MapStore, ValueTypeError } from '../..'
import { Bool } from '../../types'

describe('BooleanComputation', () => {
  const store = new MapStore()

  test('evaluates to a boolean', () => {
    const computable: Bool = {
      type: 'bool',
      value: true
    }

    const computation = new BooleanComputation(store, computable)

    expect(computation.evaluate())
      .toBe(true)
  })

  test('throws error if resolved value is not a boolean', () => {
    const computable: unknown = {
      type: 'bool',
      value: 42
    }

    const computation = new BooleanComputation(store, computable as Bool)

    expect(() => computation.evaluate())
      .toThrow(ValueTypeError)
  })
})
