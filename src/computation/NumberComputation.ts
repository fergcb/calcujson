import { ValueTypeError } from '../error'
import { Num } from '../types'
import LiteralComputation from './LiteralComputation'

export default class NumberComputation<T extends Num = Num> extends LiteralComputation<T> {
  public evaluate (): number {
    const value = super.evaluate()

    if (typeof value !== 'number') {
      throw new ValueTypeError('number', value)
    }

    return value
  }
}
