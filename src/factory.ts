import Store from './Store'
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

type ComputationFactory = (data: Computable) => Computation<any>

/**
 * Create a factory function for parsing Computables into Computations
 *
 * @param {Store} store The Store instance to pass to the generated computation
 * @returns {ComputationFactory} A function that takes Computables and returns Computations
 */
export default function (store: Store = new Store()): ComputationFactory {
  return function (data: Computable) {
    switch (data.type) {
      case 'num': return new NumberComputation(store, data as NumberComputable)
      case 'str': return new StringComputation(store, data as StringComputable)
      case 'bool': return new BooleanComputation(store, data as BooleanComputable)
    }
    throw Error(`Unrecognised computation type '${data.type}'.`)
  }
}
