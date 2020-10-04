import { Computation, IntegerComputation, NumberComputation, SumComputation } from '.'
import { Computable, Int, Num, Sum } from '../types'
import { Store } from '../store'
import { ComputationTypeError } from '../error'

export default class ComputationFactory {
  private store: Store

  constructor (store: Store) {
    this.store = store
  }

  public create<T extends Computable> (computable: T): Computation {
    switch (computable.type) {
      case 'int':
        return new IntegerComputation(this.store, computable as Int)
      case 'num':
        return new NumberComputation(this.store, computable as Num)
      case 'sum':
        return new SumComputation(this.store, computable as unknown as Sum)
    }

    throw new ComputationTypeError(computable.type)
  }
}
