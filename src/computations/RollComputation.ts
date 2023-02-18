import type RollComputable from 'computables/RollComputable'
import { type IStore } from '@/Store'
import Computation from './Computation'

export default class RollComputation extends Computation<RollComputable> {
  private readonly roll: (input: string) => number

  constructor (store: IStore, data: RollComputable) {
    super(store, data)
    try {
      this.roll = require('miniroll')
    } catch {
      throw Error('Cannot compute RollComputations without package \'miniroll\' installed.')
    }
  }

  public evaluate (): number {
    return this.roll(this.data.dice)
  }

  protected describe (): string {
    return this.data.dice
  }
}
