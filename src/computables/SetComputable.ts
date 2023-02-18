import type BaseComputable from './BaseComputable'
import type Computable from './Computable'

/**
 * A computable that stands for inserting a value into the Store
 */
export default interface SetComputable extends BaseComputable {
  type: 'set'
  path: string
  value: Computable
}
