import Computable from 'src/computables/Computable'
import Store from 'src/Store'

export default abstract class Computation<T extends Computable> {
  constructor (
    protected readonly store: Store,
    protected readonly data: T,
  ) {}

  public get desc (): string {
    return this.data.desc ?? this.describe()
  }

  public abstract evaluate (): any
  protected abstract describe (): string
}
