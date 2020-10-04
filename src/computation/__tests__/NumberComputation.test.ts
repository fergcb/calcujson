import { NumberComputation } from '..'
import { MapStore, ValueTypeError } from '../..'
import { Numeric } from '../../types'

describe('NumberComputation', () => {
  const store = new MapStore()

  test('evaluates to a number', () => {
    const computable: Numeric = {
      type: 'number',
      value: 42
    }

    const computation = new NumberComputation(store, computable)

    expect(computation.evaluate())
      .toBe(42)
  })

  test('throws error if resolved value is not a number', () => {
    const computable: unknown = {
      type: 'number',
      value: '123'
    }

    const computation = new NumberComputation(store, computable as Numeric)

    expect(() => computation.evaluate())
      .toThrow(ValueTypeError)
  })
})
