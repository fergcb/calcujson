import Computable from 'src/computables/Computable'
import { IStore } from 'src/Store'

/**
 * The base class for Computations - responsible for evaluating and describing computations using Computable data
 */
export default abstract class Computation<T extends Computable> {
  constructor (
    protected readonly store: IStore,
    protected readonly data: T,
  ) {}

  /**
   * Return a human-readable string describing the computation
   *
   * Use a provided `data.desc`, otherwise call the describe method implemented by the child class
   */
  public get desc (): string {
    return this.data.desc ?? this.describe()
  }

  /**
   * Return the result of this computation
   */
  public abstract evaluate (): any

  /**
   * Generate a human-readable string describing the computation
   */
  protected abstract describe (): string
}
