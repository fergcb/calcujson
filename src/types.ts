export interface Computable {
  type: string
  desc?: string
}

export interface Literal extends Computable {
  from?: string,
  value?: any
}

export interface Bool extends Literal {
  type: 'bool',
  value?: boolean
}

export interface Str extends Literal {
  type: 'str'
  value?: string
}

export type NumType = 'num' | 'int'

export interface Num extends Literal {
  type: NumType,
  value?: number
}

export interface Int extends Num {
  type: 'int'
}

export interface Sum extends Computable {
  type: 'sum',
  values: Num[]
}
