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

export default Computable
