import LiteralComputable, { BooleanComputable, NumberComputable, StringComputable } from 'src/computables/LiteralComputable'
import Computation from './Computation'

// Extract the type of the LiteralComputable's `value` attribute
type TypeOf<T extends LiteralComputable<any>> = T extends LiteralComputable<infer K> ? K : never

/**
 * Base class for Computations that return a constant given `value`
 */
export default abstract class LiteralComputation<T extends LiteralComputable<any>> extends Computation<T> {
  public evaluate (): TypeOf<T> {
    return this.data.value
  }

  protected describe (): string {
    return `${this.data.value}`
  }
}

/**
 * LiteralComputations for basic types
 */

export class NumberComputation extends LiteralComputation<NumberComputable> {}

export class StringComputation extends LiteralComputation<StringComputable> {
  protected describe (): string {
    // Differentiate string literals from identifiers/descriptions with double quotes
    return `"${this.data.value}"`
  }
}

export class BooleanComputation extends LiteralComputation<BooleanComputable> {}
