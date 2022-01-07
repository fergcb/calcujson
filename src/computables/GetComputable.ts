import { DataType } from 'src/Store'
import BaseComputable from './BaseComputable'

/**
 * A computable that stands for getting a value from the Store
 */
export default interface GetComputable extends BaseComputable {
  type: 'get'
  path: string
  fallback?: DataType
}
