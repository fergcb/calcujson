import Store from './Store'

export default class MapStore extends Store {
  private store: Map<string, any>

  constructor () {
    super()
    this.store = new Map<string, any>()
  }

  public has (path: string): boolean {
    return this.store.has(path)
  }

  public get (path: string) {
    return this.store.get(path)
  }

  public set (path: string, value: any): void {
    this.store.set(path, value)
  }

  public clear (): void {
    this.store.clear()
  }
}
