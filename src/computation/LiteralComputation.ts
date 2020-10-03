import { Computation } from '.'
import { Literal } from '../types'
import { Store } from '../store'
import has from 'lodash.has'
import { ComputationShapeError, PathNotFoundError } from '../error'

export default class LiteralComputation extends Computation<Literal> {
  constructor (store: Store, source: Literal) {
    super(store, source)

    if (has(this.source, 'from') && has(this.source, 'value')) {
      throw new ComputationShapeError('A literal may not have both `from` and `value` attributes.')
    }

    if (!(has(this.source, 'from') || has(this.source, 'value'))) {
      throw new ComputationShapeError('A literal object must have exactly one of `from` or `value`.')
    }
  }

  public evaluate () {
    if (has(this.source, 'from')) {
      const path = this.source.from

      if (path === undefined || !this.store.has(path)) {
        throw new PathNotFoundError(path)
      }

      return this.store.get(path)
    }

    return this.source.value
  }

  public describe (): string {
    if (has(this.source, 'desc')) return String(this.source.desc)
    if (has(this.source, 'from')) return String(this.source.from)

    return String(this.source.value)
  }
}
