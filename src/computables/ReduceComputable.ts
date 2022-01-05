import Computable from './Computable'

export default interface ReduceComputable extends Computable {
  items: Computable[]
}

export interface AddComputable extends ReduceComputable { type: 'add' }
export interface SubtractComputable extends ReduceComputable { type: 'sub' }
export interface MultiplyComputable extends ReduceComputable { type: 'mul' }
export interface DivideComputable extends ReduceComputable { type: 'div' }

export interface JoinComputable extends ReduceComputable { type: 'join' }

export interface AndComputable extends ReduceComputable { type: 'and' }
export interface OrComputable extends ReduceComputable { type: 'or' }
export interface XorComputable extends ReduceComputable { type: 'xor' }
