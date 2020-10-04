import { ValueTypeError } from '../error'
import { Integer } from '../types'
import NumberComputation from './NumberComputation'

export default class IntegerComputation extends NumberComputation<Integer> {
  public evaluate (): number {
    const value = super.evaluate()

    if (!Number.isInteger(value)) {
      throw new ValueTypeError('integer', value)
    }

    return value
  }
}
