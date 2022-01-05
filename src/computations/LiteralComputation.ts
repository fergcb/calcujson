import LiteralComputable, { BooleanComputable, NumberComputable, StringComputable } from 'src/computables/LiteralComputable'
import Computation from './Computation'

type TypeOf<T extends LiteralComputable<any>> = T extends LiteralComputable<infer K> ? K : never

export default abstract class LiteralComputation<T extends LiteralComputable<any>> extends Computation<T> {
  public evaluate (): TypeOf<T> {
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
