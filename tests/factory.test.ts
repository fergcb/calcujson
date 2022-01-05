import {
  BooleanComputation,
  NumberComputation,
  StringComputation,
} from '../src/computations/LiteralComputation'

import {
  AddComputation,
  SubtractComputation,
  MultiplyComputation,
  DivideComputation,
  JoinComputation,
  AndComputation,
  OrComputation,
  XorComputation,
} from '../src/computations/ReduceComputation'

import Factory from '../src/factory'

describe('factory', () => {
  test.each`
    Clazz                  | type       | props
    ${NumberComputation}   | ${'num'}   | ${{}}
    ${StringComputation}   | ${'str'}   | ${{}}
    ${BooleanComputation}  | ${'bool'}  | ${{}}
    ${AddComputation}      | ${'add'}   | ${{ items: [] }}
    ${SubtractComputation} | ${'sub'}   | ${{ items: [] }}
    ${MultiplyComputation} | ${'mul'}   | ${{ items: [] }}
    ${DivideComputation}   | ${'div'}   | ${{ items: [] }}
    ${JoinComputation}     | ${'join'}  | ${{ items: [] }}
    ${AndComputation}      | ${'and'}   | ${{ items: [] }}
    ${OrComputation}       | ${'or'}    | ${{ items: [] }}
    ${XorComputation}      | ${'xor'}   | ${{ items: [] }}
  `('$type', ({ Clazz, type, props }) => {
    const factory = Factory()
    const data = { type, ...props }
    const computation = factory(data)
    expect(computation).toBeInstanceOf(Clazz)
  })

  it('throws an error if the type is invalid', () => {
    const factory = Factory()
    const data = { type: 'invalid' }

    expect(() => factory(data)).toThrowError()
  })
})
