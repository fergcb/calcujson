import type BaseComputable from './BaseComputable'
import type Computable from './Computable'

/**
 * A computable for interpolating values into strings
 */
export default interface FormatComputable extends BaseComputable {
  type: 'format'
  format: string
  values?: Computable[]
}
