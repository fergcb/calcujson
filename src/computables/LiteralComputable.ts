import Computable from './Computable'

/**
 * The base type for Computables that resolve directly to a single constant value
 */
export default interface LiteralComputable<T> extends Computable {
  value: T
}

/**
 * LiteralComputables for each of the base types
 */
export interface NumberComputable extends LiteralComputable<number> { type: 'num' }
export interface StringComputable extends LiteralComputable<string> { type: 'str' }
export interface BooleanComputable extends LiteralComputable<boolean> { type: 'bool' }
