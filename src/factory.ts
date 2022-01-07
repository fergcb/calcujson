import Store, { IStore } from './Store'
import Computable from './computables/Computable'
import Computation from './computations/Computation'

import {
  BooleanComputation,
  NumberComputation,
  StringComputation,
} from './computations/LiteralComputation'

import {
  AddComputation,
  AndComputation,
  DivideComputation,
  JoinComputation,
  MultiplyComputation,
  OrComputation,
  SubtractComputation,
  XorComputation,
} from './computations/ReduceComputation'

type ComputationFactory = (data: Computable) => Computation<any>

/**
 * Create a factory function for parsing Computables into Computations
 *
 * @param {IStore} store The Store instance to pass to the generated computation
 * @returns {ComputationFactory} A function that takes Computables and returns Computations
 */
export default function (store: IStore = new Store()): ComputationFactory {
  return function (data: Computable) {
    switch (data.type) {
      case 'num': return new NumberComputation(store, data)
      case 'str': return new StringComputation(store, data)
      case 'bool': return new BooleanComputation(store, data)
      case 'add': return new AddComputation(store, data)
      case 'sub': return new SubtractComputation(store, data)
      case 'mul': return new MultiplyComputation(store, data)
      case 'div': return new DivideComputation(store, data)
      case 'join': return new JoinComputation(store, data)
      case 'and': return new AndComputation(store, data)
      case 'or': return new OrComputation(store, data)
      case 'xor': return new XorComputation(store, data)
    }
    throw Error(`Unrecognised computation type '${(data as any).type}'.`)
  }
}
