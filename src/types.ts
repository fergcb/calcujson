export interface Computable {
  type: string
  desc?: string
}

export interface Literal extends Computable {
  from?: string,
  value?: any
}

type NumericType = 'number' | 'integer'

export interface Numeric extends Literal {
  type: NumericType,
  value?: number
}

export interface Integer extends Numeric {
  type: 'integer'
}

export interface Sum extends Computable {
  type: 'sum',
  values: Numeric[]
}
