export interface Computable {
  type: string
  desc?: string
}

export interface Literal extends Computable {
  from?: string,
  value?: any
}

export interface Integer extends Literal {
  type: 'integer',
  value?: number
}

export interface Sum {
  type: 'sum',
  values: Computable[]
}
