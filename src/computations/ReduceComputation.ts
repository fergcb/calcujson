import Factory from '../factory'
import { IStore } from '../Store'
import Computation from './Computation'

import ReduceComputable, {
  AddComputable,
  AndComputable,
  DivideComputable,
  JoinComputable,
  MultiplyComputable,
  OrComputable,
  SubtractComputable,
  XorComputable,
} from '../computables/ReduceComputable'

type Reducer<R> = (a: R, b: R) => R

/**
 * Base class for Computations that evaluate and reduce an array of `items`
 */
export default abstract class ReduceComputation<T extends ReduceComputable, R> extends Computation<T> {
  private readonly items: Array<Computation<any>>

  constructor (
    private readonly symbol: string, // A symbol that represents the operation, e.g. "+"
    private readonly valueType: string, // The expected value of `typeof x` where x is an evaluated item from `data.items`
    private readonly reducer: Reducer<R>, // The function to pass to Array.prototype.reduce
    store: IStore,
    data: T,
  ) {
    super(store, data)
    // Create a factory to parse nested computables
    const factory = Factory(store)
    // Parse the nested computables
    this.items = data.items.map(computable => factory(computable))
  }

  public evaluate (): R {
    // Evaluate each nested computation
    const values = this.items.map(item => item.evaluate())
    // Ensure computations evaluate to the correct type
    values.forEach(value => {
      if (typeof value !== this.valueType) {
        throw Error(`Invalid value '${value}' in reduce computation. Expected \`typeof ${value} === "${this.valueType}"\`. `)
      }
    })
    // Apply the reducer function over the array of evaluated items
    return values.reduce(this.reducer)
  }

  protected describe (): string {
    return this.items
      .map(item => item.desc)
      // Include parentheses around descriptions containing whitespace to prevent ambiguity
      .map(desc => desc.includes(' ') ? `(${desc})` : desc)
      .join(` ${this.symbol} `)
  }
}

/**
 * Number-based ReduceComputations
 */

export class AddComputation extends ReduceComputation<AddComputable, number> {
  constructor (store: IStore, data: AddComputable) {
    super('+', 'number', (a: number, b: number) => a + b, store, data)
  }
}

export class SubtractComputation extends ReduceComputation<SubtractComputable, number> {
  constructor (store: IStore, data: SubtractComputable) {
    super('-', 'number', (a: number, b: number) => a - b, store, data)
  }
}

export class MultiplyComputation extends ReduceComputation<MultiplyComputable, number> {
  constructor (store: IStore, data: MultiplyComputable) {
    super('*', 'number', (a: number, b: number) => a * b, store, data)
  }
}

export class DivideComputation extends ReduceComputation<DivideComputable, number> {
  constructor (store: IStore, data: DivideComputable) {
    super('/', 'number', (a: number, b: number) => a / b, store, data)
  }
}

/**
 * String-based ReduceComputations
 */

export class JoinComputation extends ReduceComputation<JoinComputable, string> {
  constructor (store: IStore, data: JoinComputable) {
    super(',', 'string', (a: string, b: string) => a + b, store, data)
  }
}

/**
 * Boolean-based ReduceComputations
 */

export class AndComputation extends ReduceComputation<AndComputable, boolean> {
  constructor (store: IStore, data: AndComputable) {
    super('AND', 'boolean', (a: boolean, b: boolean) => a && b, store, data)
  }
}

export class OrComputation extends ReduceComputation<OrComputable, boolean> {
  constructor (store: IStore, data: OrComputable) {
    super('OR', 'boolean', (a: boolean, b: boolean) => a || b, store, data)
  }
}

export class XorComputation extends ReduceComputation<XorComputable, boolean> {
  constructor (store: IStore, data: XorComputable) {
    super('XOR', 'boolean', (a: boolean, b: boolean) => (a || b) && !(a && b), store, data)
  }
}
