import { ValueTypeError } from '../error'
import { Bool } from '../types'
import LiteralComputation from './LiteralComputation'

export default class BooleanComputation extends LiteralComputation<Bool> {
  public evaluate (): boolean {
    const value = super.evaluate()

    if (typeof value !== 'boolean') {
      throw new ValueTypeError('boolean', value)
    }

    return value
  }
}
