import { ValueTypeError } from '../error'
import { Str } from '../types'
import LiteralComputation from './LiteralComputation'

export default class StringComputation extends LiteralComputation<Str> {
  public evaluate (): string {
    const value = super.evaluate()

    if (typeof value !== 'string') {
      throw new ValueTypeError('string', value)
    }

    return value
  }
}
