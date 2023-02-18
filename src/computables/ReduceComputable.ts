import type BaseComputable from './BaseComputable'
import type Computable from './Computable'

/**
 * The base type for Computables that take an array of Computables,
 * then evaluate and apply a reduction to those Computables
 */
export default interface ReduceComputable extends BaseComputable {
  items: Computable[]
}

/**
 * Number-based ReduceComputables
 */
export interface AddComputable extends ReduceComputable { type: 'add' }
export interface SubtractComputable extends ReduceComputable { type: 'sub' }
export interface MultiplyComputable extends ReduceComputable { type: 'mul' }
export interface DivideComputable extends ReduceComputable { type: 'div' }

/**
 * String-based ReduceComputables
 */
export interface JoinComputable extends ReduceComputable { type: 'join' }

/**
 * Boolean-based ReduceComputables
 */
export interface AndComputable extends ReduceComputable { type: 'and' }
export interface OrComputable extends ReduceComputable { type: 'or' }
export interface XorComputable extends ReduceComputable { type: 'xor' }
