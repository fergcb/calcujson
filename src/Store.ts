// Basic data types that can exist inside a DataObject
type TerminalType = number | string | boolean

// The core data structure for a Store, a type-restricted JS object
interface DataObject {
  [key: string]: DataType
}

type DataType = TerminalType | DataObject

// Core interface for a store to be used by get/set computations
export interface IStore {
  has: (path: string) => boolean
  get: (path: string) => DataType
  set: (path: string, value: DataType) => this
}

// Type guard for TerminalType
// returns true if the value has a type in the TerminalType union
function isTerminal (value: DataType): value is TerminalType {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
}

/**
 * A basic data store to facilitate get/set computations
 */
export default class Store implements IStore {
  constructor (
    private readonly data: DataObject = {},
  ) {}

  /**
   * Check whether the Store has a value at the specified path
   *
   * @param path The path to check
   * @returns true if the path points to a value, else false
   */
  public has (path: string): boolean {
    let val: DataType = this.data
    const segs = path.split('.')
    for (const seg of segs) {
      val = val[seg]
      if (val === undefined) return false
    }
    return true
  }

  /**
   * Get the value at a given path
   *
   * @throws if the path is invalid
   * @param path The path to get from
   * @returns The value at the path
   */
  public get (path: string): DataType {
    let val: DataType = this.data
    const visited: string[] = []
    path.split('.').forEach(seg => {
      visited.push(seg)
      if (isTerminal(val)) throw Error(`Can't access property '.${seg}' on terminal value ${val} at '${visited.join('.')}'`)
      if (val[seg] === undefined) throw Error(`No such property '.${seg}' on object at '${visited.join('.')}'`)
      val = val[seg]
    })

    return val
  }

  /**
   * Insert/update a value at a given path
   *
   * @param path The path at which to insert the value
   * @param value The value to insert/update
   * @returns a reference to the Store instance, for chaining
   */
  public set (path: string, value: DataType): this {
    let obj: DataType = this.data
    const visited: string[] = []
    const segs = path.split('.')
    const name = segs.pop()
    if (name === undefined || name === '') throw Error(`No name specified in path ${path}.`)
    segs.forEach(seg => {
      visited.push(seg)
      if (obj[seg] === undefined) obj[seg] = {}
      obj = obj[seg]
      if (isTerminal(obj)) throw Error(`Can't access property '.${seg}' on terminal value ${obj} at '${visited.join('.')}'`)
    })
    obj[name] = value
    return this
  }
}
