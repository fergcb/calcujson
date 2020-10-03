import { Computable } from '../types'
import { Store } from '../store'

export default abstract class Computation<T extends Computable = Computable> {
  protected store: Store
  protected source: T

  constructor (store: Store, source: T) {
    this.store = store
    this.source = source
  }

  public abstract evaluate (): any
  public abstract describe (): string
}
