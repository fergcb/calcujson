import { BooleanComputation, NumberComputation, StringComputation } from 'computations/LiteralComputation'
import type LiteralComputation from 'computations/LiteralComputation'
import Store from '@/Store'

describe('LiteralComputation', () => {
  describe.each`
    name                    | Computation           | type      | value    | desc
    ${'NumberComputation'}  | ${NumberComputation}  | ${'num'}  | ${42}    | ${'42'}
    ${'StringComputation'}  | ${StringComputation}  | ${'str'}  | ${'foo'} | ${'"foo"'}
    ${'BooleanComputation'} | ${BooleanComputation} | ${'bool'} | ${true}  | ${'true'}
  `('$name', ({ Computation, type, value, desc }) => {
    let store: Store
    let computation: LiteralComputation<any>

    beforeEach(() => {
      store = new Store()
      computation = new Computation(store, {
        type,
        value,
      })
    })

    it('evaluates to given value', () => {
      expect(computation.evaluate()).toBe(value)
    })

    it('is described correctly', () => {
      expect(computation.desc).toBe(desc)
    })
  })
})
