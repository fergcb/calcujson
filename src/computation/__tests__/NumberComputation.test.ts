import { NumberComputation } from '..'
import { MapStore, ValueTypeError } from '../..'
import { Num } from '../../types'

describe('NumberComputation', () => {
  const store = new MapStore()

  test('evaluates to a number', () => {
    const computable: Num = {
      type: 'num',
      value: 42
    }

    const computation = new NumberComputation(store, computable)

    expect(computation.evaluate())
      .toBe(42)
  })

  test('throws error if resolved value is not a number', () => {
    const computable: unknown = {
      type: 'num',
      value: '123'
    }

    const computation = new NumberComputation(store, computable as Num)

    expect(() => computation.evaluate())
      .toThrow(ValueTypeError)
  })
})
