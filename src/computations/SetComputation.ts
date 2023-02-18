import type SetComputable from 'computables/SetComputable'
import { type IStore } from '@/Store'
import Factory from '@/factory'
import Computation from './Computation'

/**
 * A computation that evaluates its child and stores the result.
 * The value is also returned for use in parent computations.
 */
export default class SetComputation extends Computation<SetComputable> {
  private readonly computation: Computation<any>

  constructor (store: IStore, data: SetComputable) {
    super(store, data)
    const factory = Factory()
    this.computation = factory(this.data.value)
  }

  public evaluate (): any {
    const value = this.computation.evaluate()
    this.store.set(this.data.path, value)
    return value
  }

  protected describe (): string {
    return `${this.data.path} := ${this.computation.desc}`
  }
}
