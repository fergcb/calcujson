import Store, { IStore } from './Store'
import Computable from './computables/Computable'
import Computation from './computations/Computation'

import {
  BooleanComputable,
  NumberComputable,
  StringComputable,
} from './computables/LiteralComputable'

import {
  BooleanComputation,
  NumberComputation,
  StringComputation,
} from './computations/LiteralComputation'

import {
  AddComputable,
  AndComputable,
  DivideComputable,
  JoinComputable,
  MultiplyComputable,
  OrComputable,
  SubtractComputable,
  XorComputable,
} from './computables/ReduceComputable'

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
      case 'num': return new NumberComputation(store, data as NumberComputable)
      case 'str': return new StringComputation(store, data as StringComputable)
      case 'bool': return new BooleanComputation(store, data as BooleanComputable)
      case 'add': return new AddComputation(store, data as AddComputable)
      case 'sub': return new SubtractComputation(store, data as SubtractComputable)
      case 'mul': return new MultiplyComputation(store, data as MultiplyComputable)
      case 'div': return new DivideComputation(store, data as DivideComputable)
      case 'join': return new JoinComputation(store, data as JoinComputable)
      case 'and': return new AndComputation(store, data as AndComputable)
      case 'or': return new OrComputation(store, data as OrComputable)
      case 'xor': return new XorComputation(store, data as XorComputable)
    }
    throw Error(`Unrecognised computation type '${data.type}'.`)
  }
}
