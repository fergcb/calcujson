export default abstract class Store {
  public abstract has (path: string): boolean
  public abstract get (path: string): any
  public abstract set (path: string, value: any): void
  public abstract clear (): void
}
