import { StringComputation } from '..'
import { MapStore, ValueTypeError } from '../..'
import { Str } from '../../types'

describe('StringComputation', () => {
  const store = new MapStore()

  test('evaluates to a string', () => {
    const computable: Str = {
      type: 'str',
      value: 'foo'
    }

    const computation = new StringComputation(store, computable)

    expect(computation.evaluate())
      .toBe('foo')
  })

  test('throws error if resolved value is not a string', () => {
    const computable: unknown = {
      type: 'str',
      value: 42
    }

    const computation = new StringComputation(store, computable as Str)

    expect(() => computation.evaluate())
      .toThrow(ValueTypeError)
  })
})
