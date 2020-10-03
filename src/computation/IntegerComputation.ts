import { ValueTypeError } from '../error'
import LiteralComputation from './LiteralComputation'

export default class IntegerComputation extends LiteralComputation {
  public evaluate (): number {
    const value = super.evaluate()

    if (!Number.isInteger(value)) {
      throw new ValueTypeError('integer', value)
    }

    return value
  }
}
