import { IntegerComputation } from '..'
import { MapStore, ValueTypeError } from '../..'
import { Integer } from '../../types'

describe('IntegerComputation', () => {
  const store = new MapStore()

  test('evaluates to an integer', () => {
    const computable: Integer = {
      type: 'integer',
      value: 42
    }

    const computation = new IntegerComputation(store, computable)

    expect(computation.evaluate())
      .toBe(42)
  })

  test('throws error if resolved value is not an integer', () => {
    const computable: unknown = {
      type: 'integer',
      value: 4.2
    }

    const computation = new IntegerComputation(store, computable as Integer)

    expect(() => computation.evaluate())
      .toThrow(ValueTypeError)
  })
})
