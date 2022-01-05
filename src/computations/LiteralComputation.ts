import LiteralComputable, { BooleanComputable, NumberComputable, StringComputable } from 'src/computables/LiteralComputable'
import Computation from './Computation'

export default abstract class LiteralComputation<T extends LiteralComputable<any>> extends Computation<T> {
  public evaluate (): T extends LiteralComputable<infer K> ? K : unknown {
    return this.data.value
  }

  protected describe (): string {
    return `${this.data.value}`
  }
}

export class NumberComputation extends LiteralComputation<NumberComputable> {}

export class StringComputation extends LiteralComputation<StringComputable> {
  protected describe (): string {
    return `"${this.data.value}"`
  }
}

export class BooleanComputation extends LiteralComputation<BooleanComputable> {}
