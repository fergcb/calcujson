import type BaseComputable from './BaseComputable'

/**
 * The base type for Computables that resolve directly to a single constant value
 */
export default interface LiteralComputable<T> extends BaseComputable {
  value: T
}

/**
 * LiteralComputables for each of the base types
 */
export interface NumberComputable extends LiteralComputable<number> { type: 'num' }
export interface StringComputable extends LiteralComputable<string> { type: 'str' }
export interface BooleanComputable extends LiteralComputable<boolean> { type: 'bool' }
