import type FormatComputable from '@/computables/FormatComputable'
import Factory from '@/factory'
import { type IStore } from '@/Store'
import Computation from './Computation'

const templatePattern = /\{(?:(?<index>0|[1-9][0-9]*)|(?:\$(?<path>[^{}$|.]+(?:\.[^{}$|.]+)*)(?:\|(?<fallback>[^{}$.]+))?))\}/g

export default class FormatComputation extends Computation<FormatComputable> {
  private readonly values: Array<Computation<any>>

  constructor (store: IStore, data: FormatComputable) {
    super(store, data)
    const factory = Factory(store)
    this.values = data.values.map(computable => factory(computable))
  }

  public evaluate (): string {
    const { format } = this.data

    return format.replaceAll(templatePattern, (match: string, index: string, path: string, fallback: string): string => {
      if (index !== undefined) {
        const idx = parseInt(index, 10)
        const value = this.values[idx]
        if (value === undefined) return match
        return String(value.evaluate())
      }

      if (!this.store.has(path)) {
        if (fallback !== undefined) return fallback
        return match
      }

      return String(this.store.get(path))
    })
  }

  protected describe (): string {
    const { format } = this.data
    const partFormatted = format.replaceAll(templatePattern, (match: string, index: string): string => {
      if (index !== undefined) {
        const idx = parseInt(index, 10)
        return `{${this.values[idx]?.desc ?? index}}`
      }

      return match
    })
    return `\`${partFormatted}\``
  }
}
