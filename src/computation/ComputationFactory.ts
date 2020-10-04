import { Computation, IntegerComputation, NumberComputation } from '.'
import { Computable, Integer, Numeric } from '../types'
import { Store } from '../store'
import { ComputationTypeError } from '../error'

export default class ComputationFactory {
  private store: Store

  constructor (store: Store) {
    this.store = store
  }

  public create<T extends Computable> (computable: T): Computation {
    switch (computable.type) {
      case 'integer':
        return new IntegerComputation(this.store, computable as Integer)
      case 'number':
        return new NumberComputation(this.store, computable as Numeric)
    }

    throw new ComputationTypeError(computable.type)
  }
}
