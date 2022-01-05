import Factory from '../factory'
import Store from '../Store'
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

export default abstract class ReduceComputation<T extends ReduceComputable, R> extends Computation<T> {
  private readonly items: Array<Computation<any>>

  constructor (
    private readonly symbol: string,
    private readonly valueType: string,
    private readonly reducer: Reducer<R>,
    store: Store,
    data: T,
  ) {
    super(store, data)
    const factory = Factory(store)
    this.items = data.items.map(computable => factory(computable))
  }

  public evaluate (): R {
    const values = this.items.map(item => item.evaluate())
    values.forEach(value => {
      if (typeof value !== this.valueType) {
        throw Error(`Invalid value '${value}' in reduce computation. Expected \`typeof ${value} === "${this.valueType}"\`. `)
      }
    })
    return values.reduce(this.reducer)
  }

  protected describe (): string {
    return this.items
      .map(item => item.desc)
      .map(desc => desc.includes(' ') ? `(${desc})` : desc)
      .join(` ${this.symbol} `)
  }
}

export class AddComputation extends ReduceComputation<AddComputable, number> {
  constructor (store: Store, data: AddComputable) {
    super('+', 'number', (a: number, b: number) => a + b, store, data)
  }
}

export class SubtractComputation extends ReduceComputation<SubtractComputable, number> {
  constructor (store: Store, data: SubtractComputable) {
    super('-', 'number', (a: number, b: number) => a - b, store, data)
  }
}

export class MultiplyComputation extends ReduceComputation<MultiplyComputable, number> {
  constructor (store: Store, data: MultiplyComputable) {
    super('*', 'number', (a: number, b: number) => a * b, store, data)
  }
}

export class DivideComputation extends ReduceComputation<DivideComputable, number> {
  constructor (store: Store, data: DivideComputable) {
    super('/', 'number', (a: number, b: number) => a / b, store, data)
  }
}

export class JoinComputation extends ReduceComputation<JoinComputable, string> {
  constructor (store: Store, data: JoinComputable) {
    super(',', 'string', (a: string, b: string) => a + b, store, data)
  }
}

export class AndComputation extends ReduceComputation<AndComputable, boolean> {
  constructor (store: Store, data: AndComputable) {
    super('AND', 'boolean', (a: boolean, b: boolean) => a && b, store, data)
  }
}

export class OrComputation extends ReduceComputation<OrComputable, boolean> {
  constructor (store: Store, data: OrComputable) {
    super('OR', 'boolean', (a: boolean, b: boolean) => a || b, store, data)
  }
}

export class XorComputation extends ReduceComputation<XorComputable, boolean> {
  constructor (store: Store, data: XorComputable) {
    super('XOR', 'boolean', (a: boolean, b: boolean) => (a || b) && !(a && b), store, data)
  }
}
