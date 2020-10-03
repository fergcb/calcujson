export class CalcuJSONError extends Error {}

export class ComputationError extends CalcuJSONError {}

export class ComputationTypeError extends ComputationError {
  constructor (type: string) {
    super(`Invalid computation type \`${type}\`.`)
  }
}

export class ComputationShapeError extends ComputationError {}

export class PathNotFoundError extends CalcuJSONError {
  constructor (path?: string) {
    super(`Path \`${path}\` not found.`)
  }
}

export class ValueTypeError extends CalcuJSONError {
  constructor (type: string, value: any) {
    super(`Type of value \`${value}\` is invald for \`${type}\` computation.`)
  }
}