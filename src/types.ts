export interface Computable {
  type: string
  desc?: string
}

export interface Literal extends Computable {
  from?: string,
  value?: any
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
