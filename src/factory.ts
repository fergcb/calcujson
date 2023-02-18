import Store, { type IStore } from './Store'
import type Computable from 'computables/Computable'
import type Computation from 'computations/Computation'

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

import GetComputation from './computations/GetComputation'
import SetComputation from './computations/SetComputation'
import FormatComputation from './computations/FormatComputation'

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
      case 'get': return new GetComputation(store, data)
      case 'set': return new SetComputation(store, data)
      case 'format': return new FormatComputation(store, data)
      default: throw Error(`Unrecognised computation type '${(data as Computable).type}'.`)
    }
  }
}
