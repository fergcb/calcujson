import {
  BooleanComputation,
  NumberComputation,
  StringComputation,
} from 'computations/LiteralComputation'

import {
  AddComputation,
  SubtractComputation,
  MultiplyComputation,
  DivideComputation,
  JoinComputation,
  AndComputation,
  OrComputation,
  XorComputation,
} from 'computations/ReduceComputation'

import GetComputation from 'computations/GetComputation'
import SetComputation from 'computations/SetComputation'

import Factory from '@/factory'

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
    ${GetComputation}      | ${'get'}   | ${{}}
    ${SetComputation}      | ${'set'}   | ${{ value: { type: 'str', value: 'irrelevant' } }}
  `('$type', ({ Clazz, type, props }) => {
    const factory = Factory()
    const data = { type, ...props }
    const computation = factory(data)
    expect(computation).toBeInstanceOf(Clazz)
  })

  it('throws an error if the type is invalid', () => {
    const factory = Factory()
    const data = { type: 'invalid' }

    expect(() => factory(data as any)).toThrowError()
  })
})
