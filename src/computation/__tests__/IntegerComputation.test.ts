import { IntegerComputation } from '..'
import { MapStore, ValueTypeError } from '../..'

describe('IntegerComputation', () => {
  const store = new MapStore()

  test('evaluates to an integer', () => {
    const computable = {
      type: 'integer',
      value: 42
    }

    const computation = new IntegerComputation(store, computable)

    expect(computation.evaluate())
      .toBe(42)
  })

  test('throws error if resolved value is not an integer', () => {
    const computable = {
      type: 'integer',
      value: 4.2
    }

    const computation = new IntegerComputation(store, computable)

    expect(() => computation.evaluate())
      .toThrow(ValueTypeError)
  })
})
