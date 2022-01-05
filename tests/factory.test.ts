import { BooleanComputation, NumberComputation, StringComputation } from '../src/computations/LiteralComputation'
import Factory from '../src/factory'

describe('factory', () => {
  test.each`
    Clazz                 | type
    ${NumberComputation}  | ${'num'}
    ${StringComputation}  | ${'str'}
    ${BooleanComputation} | ${'bool'}
  `('$type', ({ Clazz, type }) => {
    const factory = Factory()
    const data = { type }
    const computation = factory(data)
    expect(computation).toBeInstanceOf(Clazz)
  })

  it('throws an error if the type is invalid', () => {
    const factory = Factory()
    const data = { type: 'invalid' }

    expect(() => factory(data)).toThrowError()
  })
})
