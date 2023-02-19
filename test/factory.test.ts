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
import FormatComputation from 'computations/FormatComputation'

import Factory from '@/factory'

describe('factory', () => {
  test.each`
    Clazz                  | type         | props
    ${NumberComputation}   | ${'num'}     | ${{}}
    ${StringComputation}   | ${'str'}     | ${{}}
    ${BooleanComputation}  | ${'bool'}    | ${{}}
    ${AddComputation}      | ${'add'}     | ${{ items: [] }}
    ${SubtractComputation} | ${'sub'}     | ${{ items: [] }}
    ${MultiplyComputation} | ${'mul'}     | ${{ items: [] }}
    ${DivideComputation}   | ${'div'}     | ${{ items: [] }}
    ${JoinComputation}     | ${'join'}    | ${{ items: [] }}
    ${AndComputation}      | ${'and'}     | ${{ items: [] }}
    ${OrComputation}       | ${'or'}      | ${{ items: [] }}
    ${XorComputation}      | ${'xor'}     | ${{ items: [] }}
    ${GetComputation}      | ${'get'}     | ${{}}
    ${SetComputation}      | ${'set'}     | ${{ value: { type: 'str', value: 'irrelevant' } }}
    ${FormatComputation}   | ${'format'}  | ${{ format: '{}' }}
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

  it('uses the same store for subsequent computations', () => {
    const factory = Factory()

    const set = factory({ type: 'set', path: 'foo.bar', value: { type: 'num', value: 42 } })
    const get = factory({ type: 'get', path: 'foo.bar' })

    set.evaluate()
    expect(get.evaluate()).toEqual(42)
  })

  it('uses the same store for subsequent computations with nested evaluations', () => {
    const factory = Factory()

    const set = factory({ type: 'set', path: 'foo.bar', value: { type: 'num', value: 42 } })
    const mul = factory({ type: 'mul', items: [{ type: 'get', path: 'foo.bar' }, { type: 'num', value: 2 }] })

    set.evaluate()
    expect(mul.evaluate()).toEqual(84)
  })
})
