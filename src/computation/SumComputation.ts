import { Computation, ComputationFactory } from '.'
import { Sum } from '../types'
import { Store } from '../store'
import has from 'lodash.has'
import { ComputationShapeError } from '../error'

export default class SumComputation extends Computation<Sum> {
  private factory: ComputationFactory

  constructor (store: Store, source: Sum) {
    super(store, source)

    this.factory = new ComputationFactory(store)

    if (!has(this.source, 'values')) {
      throw new ComputationShapeError('A sum object must have a `values` array.')
    }
  }

  public evaluate (): number {
    if (this.source.values.length === 0) return 0

    let sum = 0

    this.source.values
      .forEach(comp => {
        const value = this.factory.create(comp).evaluate()

        const jsType = typeof value
        if (jsType !== 'number') {
          throw new ComputationShapeError(`All values of a sum computation must be numeric, \`${value.type} (${jsType})\` found.`)
        }

        sum += value
      })

    return sum
  }

  public describe (): string {
    if (has(this.source, 'desc')) return String(this.source.desc)

    return this.source.values
      .map(value => this.factory.create(value).describe())
      .join(' + ')
  }
}
