import { ValueTypeError } from '../error'
import { Numeric } from '../types'
import LiteralComputation from './LiteralComputation'

export default class NumberComputation<T extends Numeric = Numeric> extends LiteralComputation<T> {
  public evaluate (): number {
    const value = super.evaluate()

    if (typeof value !== 'number') {
      throw new ValueTypeError('number', value)
    }

    return value
  }
}
