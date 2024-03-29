import {
  type BooleanComputable,
  type NumberComputable,
  type StringComputable,
} from './LiteralComputable'

import {
  type AddComputable,
  type AndComputable,
  type DivideComputable,
  type JoinComputable,
  type MultiplyComputable,
  type OrComputable,
  type SubtractComputable,
  type XorComputable,
} from './ReduceComputable'

import type GetComputable from './GetComputable'
import type SetComputable from './SetComputable'
import type FormatComputable from './FormatComputable'

type Computable
  = NumberComputable
  | StringComputable
  | BooleanComputable
  | AddComputable
  | SubtractComputable
  | MultiplyComputable
  | DivideComputable
  | JoinComputable
  | AndComputable
  | OrComputable
  | XorComputable
  | GetComputable
  | SetComputable
  | FormatComputable

export default Computable
