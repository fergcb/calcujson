import { MapStore, Sum, SumComputation, ComputationShapeError } from '../..'

describe('SumComputation', () => {
  const store = new MapStore()

  beforeAll(() => {
    store.clear()
  })

  describe('constructor', () => {
    test('throws error if `values` array is missing', () => {
      const computable: unknown = {
        type: 'sum'
      }

      expect(() => new SumComputation(store, computable as Sum))
        .toThrow(ComputationShapeError)
    })
  })

  describe('evaluate', () => {
    test('returns the sum of resolved values', () => {
      const computable: Sum = {
        type: 'sum',
        values: [
          {
            type: 'num',
            value: 1
          },
          {
            type: 'num',
            value: 2
          },
          {
            type: 'num',
            value: 3
          }
        ]
      }

      const computation = new SumComputation(store, computable)

      expect(computation.evaluate())
        .toBe(6)
    })

    test('returns the sum of mixed numeric values', () => {
      const computable: Sum = {
        type: 'sum',
        values: [
          {
            type: 'num',
            value: 0.1
          },
          {
            type: 'int',
            value: 1
          },
          {
            type: 'num',
            value: 10.01
          }
        ]
      }

      const computation = new SumComputation(store, computable)

      expect(computation.evaluate())
        .toBe(11.11)
    })

    test('defaults to 0 if values array is empty', () => {
      const computable: Sum = {
        type: 'sum',
        values: []
      }

      const computation = new SumComputation(store, computable)

      expect(computation.evaluate())
        .toBe(0)
    })

    test('throws error if non-numeric types are supplied', () => {
      // TODO: Implement this test once non-numeric types are available
    })
  })

  describe('describe', () => {
    test('defaults to give description', () => {
      const computable: Sum = {
        type: 'sum',
        values: [],
        desc: 'An empty sum.'
      }

      const computation = new SumComputation(store, computable)

      expect(computation.describe())
        .toBe(computable.desc)
    })

    test('aggregates descriptions of values to be summed', () => {
      const computable: Sum = {
        type: 'sum',
        values: [
          {
            type: 'num',
            value: 1
          },
          {
            type: 'num',
            value: 2,
            desc: 'two'
          },
          {
            type: 'num',
            from: 'number.three'
          }
        ]
      }

      const computation = new SumComputation(store, computable)

      expect(computation.describe())
        .toBe('1 + two + number.three')
    })
  })
})
