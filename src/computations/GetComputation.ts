import type GetComputable from 'computables/GetComputable'
import { type DataType } from '@/Store'
import Computation from './Computation'

/**
 * A computation that evaluates to a stored value found at a given path
 */
export default class GetComputation extends Computation<GetComputable> {
  public evaluate (): DataType {
    const { path, fallback } = this.data
    if (this.store.has(path)) return this.store.get(path)
    if (fallback !== undefined) return fallback
    throw Error(`Failed to get value at path '${path}'.`)
  }

  protected describe (): string {
    return this.data.path
  }
}
