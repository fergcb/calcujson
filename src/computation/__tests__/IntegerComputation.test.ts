import { IntegerComputation } from '..'
import { MapStore, ValueTypeError } from '../..'
import { Int } from '../../types'

describe('IntegerComputation', () => {
  const store = new MapStore()

  test('evaluates to an integer', () => {
    const computable: Int = {
      type: 'int',
      value: 42
    }

    const computation = new IntegerComputation(store, computable)

    expect(computation.evaluate())
      .toBe(42)
  })

  test('throws error if resolved value is not an integer', () => {
    const computable: unknown = {
      type: 'int',
      value: 4.2
    }

    const computation = new IntegerComputation(store, computable as Int)

    expect(() => computation.evaluate())
      .toThrow(ValueTypeError)
  })
})
