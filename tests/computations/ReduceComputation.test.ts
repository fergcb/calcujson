
import ReduceComputable from 'src/computables/ReduceComputable'
import ReduceComputation, {
  AddComputation,
  AndComputation,
  DivideComputation,
  JoinComputation,
  MultiplyComputation,
  OrComputation,
  SubtractComputation,
  XorComputation,
} from '../../src/computations/ReduceComputation'
import Store from '../../src/Store'

const nums = [{ type: 'num', value: 1 }, { type: 'num', value: 2 }, { type: 'num', value: 3, desc: 'foo' }]
const strs = [{ type: 'str', value: 'a' }, { type: 'str', value: 'b' }, { type: 'str', value: 'c', desc: 'foo' }]
const bools = [{ type: 'bool', value: true }, { type: 'bool', value: false }, { type: 'bool', value: true, desc: 'foo' }]

describe('ReduceComputation', () => {
  describe.each`
    name                     | Computation            | type      | items    | expectedResult | expectedDesc
    ${'AddComputation'}      | ${AddComputation}      | ${'add'}  | ${nums}  | ${6}           | ${'1 + 2 + foo'}
    ${'SubtractComputation'} | ${SubtractComputation} | ${'sub'}  | ${nums}  | ${-4}          | ${'1 - 2 - foo'}
    ${'MultiplyComputation'} | ${MultiplyComputation} | ${'mul'}  | ${nums}  | ${6}           | ${'1 * 2 * foo'}
    ${'DivideComputation'}   | ${DivideComputation}   | ${'div'}  | ${nums}  | ${1 / 6}       | ${'1 / 2 / foo'}
    ${'JoinComputation'}     | ${JoinComputation}     | ${'join'} | ${strs}  | ${'abc'}       | ${'"a" , "b" , foo'}
    ${'AndComputation'}      | ${AndComputation}      | ${'and'}  | ${bools} | ${false}       | ${'true AND false AND foo'}
    ${'OrComputation'}       | ${OrComputation}       | ${'or'}   | ${bools} | ${true}        | ${'true OR false OR foo'}
    ${'XorComputation'}      | ${XorComputation}      | ${'xor'}  | ${bools} | ${false}       | ${'true XOR false XOR foo'}
  `('$name', ({ Computation, type, items, expectedResult, expectedDesc }) => {
    let store: Store
    let computation: ReduceComputation<ReduceComputable, any>

    beforeEach(() => {
      store = new Store()
      computation = new Computation(store, {
        type,
        items,
      })
    })

    it('evaluates to given value', () => {
      expect(computation.evaluate()).toBe(expectedResult)
    })

    it('is described correctly', () => {
      expect(computation.desc).toBe(expectedDesc)
    })
  })
})
