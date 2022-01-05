import Store from '../src/Store'

describe('Store', () => {
  it('has an existing top-level value', () => {
    const path = 'foo'
    const data = { [path]: 42 }
    const store = new Store(data)

    expect(store.has(path)).toBe(true)
  })

  it('has an existing nested value', () => {
    const path = 'foo.bar.baz'
    const data = { foo: { bar: { baz: 42 } } }
    const store = new Store(data)

    expect(store.has(path)).toBe(true)
  })

  it('has not an invalid path', () => {
    const store = new Store()
    const path = 'foo.bar'

    expect(store.has(path)).toBe(false)
  })

  it('gets an existing top-level value', () => {
    const path = 'foo'
    const value = 42
    const data = { [path]: value }
    const store = new Store(data)

    expect(store.get(path)).toBe(value)
  })

  it('gets an existing nested value', () => {
    const path = 'foo.bar.baz'
    const value = 42
    const data = { foo: { bar: { baz: value } } }
    const store = new Store(data)

    expect(store.get(path)).toBe(value)
  })

  it('sets a top-level value', () => {
    const path = 'foo'
    const value = 42
    const data = {}
    const expectedData = { [path]: value }

    const store = new Store(data)
    store.set(path, value)

    expect(data).toEqual(expectedData)
  })

  it('sets a nested value', () => {
    const path = 'foo.bar.baz'
    const value = 42
    const data = {}
    const expectedData = { foo: { bar: { baz: 42 } } }

    const store = new Store(data)
    store.set(path, value)

    expect(data).toEqual(expectedData)
  })

  it('throws an error when getting a non-existant path', () => {
    const store = new Store()
    const path = 'invalid'

    expect(() => store.get(path)).toThrowError()
  })

  it('throws an error when getting if a non-final path element points to a terminal value', () => {
    const data = { foo: 42 }
    const store = new Store(data)

    const path = 'foo.bar'

    expect(() => store.get(path)).toThrowError()
  })

  it('throws an error when setting if the path contains no name (i.e. a final segment)', () => {
    const store = new Store()
    const path = 'foo.'

    expect(() => store.set(path, 42)).toThrowError()
  })

  it('throws an error when setting if a non-final path element points to a terminal value', () => {
    const data = { foo: 42 }
    const store = new Store(data)

    const path = 'foo.bar'

    expect(() => store.set(path, 42)).toThrowError()
  })
})
