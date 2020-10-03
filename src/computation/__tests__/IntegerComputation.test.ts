import { IntegerComputation } from '..'
import { MapStore, ValueTypeError, PathNotFoundError, ComputationShapeError } from '../..'

describe('IntegerComputation', () => {
  const store = new MapStore()

  beforeEach(() => {
    store.clear()
  })

  describe('construction', () => {
    test('fails if neither `from` nor `value` is specified', () => {
      const computable = {
        type: 'integer'
      }

      expect(() => new IntegerComputation(store, computable))
        .toThrow(ComputationShapeError)
    })

    test('fails if both `from` and `value` are specified', () => {
      const computable = {
        type: 'integer',
        from: 'test.path',
        value: 42
      }

      expect(() => new IntegerComputation(store, computable))
        .toThrow(ComputationShapeError)
    })
  })

  test('evaluates to given value if specified', () => {
    const computable = {
      type: 'integer',
      value: 42
    }

    const computation = new IntegerComputation(store, computable)

    expect(computation.evaluate())
      .toBe(42)
  })

  test('evaluates to stored value at given path', () => {
    const computable = {
      type: 'integer',
      from: 'test'
    }

    store.set(computable.from, 42)

    const computation = new IntegerComputation(store, computable)

    expect(computation.evaluate())
      .toBe(42)
  })

  test('throws error if path not found', () => {
    const computable = {
      type: 'integer',
      from: 'test'
    }

    const computation = new IntegerComputation(store, computable)

    expect(() => computation.evaluate())
      .toThrow(PathNotFoundError)
  })

  test('throws error if value at path is not an integer', () => {
    const computable = {
      type: 'integer',
      from: 'test'
    }

    store.set(computable.from, 4.2)

    const computation = new IntegerComputation(store, computable)

    expect(() => computation.evaluate())
      .toThrow(ValueTypeError)
  })

  test('described with given value', () => {
    const computable = {
      type: 'integer',
      value: 42
    }

    const computation = new IntegerComputation(store, computable)

    expect(computation.describe())
      .toBe('42')
  })

  test('described with given path', () => {
    const computable = {
      type: 'integer',
      from: 'test.path'
    }

    const computation = new IntegerComputation(store, computable)

    expect(computation.describe())
      .toBe('test.path')
  })

  test('described with given description', () => {
    const computable = {
      type: 'integer',
      value: 42,
      desc: 'The answer to life, the universe, and everything'
    }

    const computation = new IntegerComputation(store, computable)

    expect(computation.describe())
      .toBe(computable.desc)
  })
})
