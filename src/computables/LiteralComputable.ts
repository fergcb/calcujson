import Computable from './Computable'

export default interface LiteralComputable<T> extends Computable {
  value: T
}

export interface NumberComputable extends LiteralComputable<number> { type: 'num' }
export interface StringComputable extends LiteralComputable<string> { type: 'str' }
export interface BooleanComputable extends LiteralComputable<boolean> { type: 'bool' }
