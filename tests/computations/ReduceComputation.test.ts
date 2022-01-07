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
const bools = [{ type: 'bool', value: true, desc: 'foo' }, { type: 'bool', value: false }, { type: 'bool', value: true }, { type: 'bool', value: false }]
const bools2 = [{ type: 'bool', value: false, desc: 'foo' }, { type: 'bool', value: true }, { type: 'bool', value: true }, { type: 'bool', value: false }]

describe('ReduceComputation', () => {
  describe.each`
    name                     | Computation            | type      | items    | expectedResult | expectedDesc                | invalidItem
    ${'AddComputation'}      | ${AddComputation}      | ${'add'}  | ${nums}  | ${6}           | ${'1 + 2 + foo'}            | ${{ type: 'str', value: 'bar' }}
    ${'SubtractComputation'} | ${SubtractComputation} | ${'sub'}  | ${nums}  | ${-4}          | ${'1 - 2 - foo'}            | ${{ type: 'str', value: 'bar' }}
    ${'MultiplyComputation'} | ${MultiplyComputation} | ${'mul'}  | ${nums}  | ${6}           | ${'1 * 2 * foo'}            | ${{ type: 'str', value: 'bar' }}
    ${'DivideComputation'}   | ${DivideComputation}   | ${'div'}  | ${nums}  | ${1 / 6}       | ${'1 / 2 / foo'}            | ${{ type: 'str', value: 'bar' }}
    ${'JoinComputation'}     | ${JoinComputation}     | ${'join'} | ${strs}  | ${'abc'}       | ${'"a" , "b" , foo'}        | ${{ type: 'bool', value: false }}
    ${'AndComputation'}      | ${AndComputation}      | ${'and'}  | ${bools} | ${false}       | ${'foo AND false AND true AND false'} | ${{ type: 'num', value: 42 }}
    ${'OrComputation'}       | ${OrComputation}       | ${'or'}   | ${bools2} | ${true}        | ${'foo OR true OR true OR false'}   | ${{ type: 'num', value: 42 }}
    ${'XorComputation'}      | ${XorComputation}      | ${'xor'}  | ${bools} | ${false}       | ${'foo XOR false XOR true XOR false'} | ${{ type: 'num', value: 42 }}
  `('$name', ({ Computation, type, items, expectedResult, expectedDesc, invalidItem }) => {
    let store: Store
    let computation: ReduceComputation<ReduceComputable, any>

    describe('with valid items', () => {
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

    it('throws an error with an invalid item', () => {
      store = new Store()
      computation = new Computation(store, {
        type,
        items: [invalidItem],
      })

      expect(() => computation.evaluate()).toThrowError()
    })
  })

  it('places parameters around complex nested items', () => {
    const store = new Store()
    const computation = new AddComputation(store, {
      type: 'add',
      items: [
        { type: 'num', value: 1 },
        { type: 'num', value: 2 },
        {
          type: 'mul',
          items: [
            { type: 'num', value: 3 },
            { type: 'num', value: 4 },
          ],
        },
      ],
    })
    const expectedDesc = '1 + 2 + (3 * 4)'

    expect(computation.desc).toBe(expectedDesc)
  })
})
