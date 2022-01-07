import {
  BooleanComputable,
  NumberComputable,
  StringComputable,
} from './LiteralComputable'

import {
  AddComputable,
  AndComputable,
  DivideComputable,
  JoinComputable,
  MultiplyComputable,
  OrComputable,
  SubtractComputable,
  XorComputable,
} from './ReduceComputable'

import GetComputable from './GetComputable'
import SetComputable from './SetComputable'

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

export default Computable
