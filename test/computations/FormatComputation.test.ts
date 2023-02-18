import Store, { type IStore, type DataType } from '@/Store'
import FormatComputation from 'computations/FormatComputation'
import type Computable from '@/computables/Computable'

describe('FormatComputation', () => {
  describe('with numeric templates', () => {
    let store: IStore
    let computation: FormatComputation

    const testFormat = '{0} {2} {1}'
    const testValues: Computable[] = [
      { type: 'num', value: 42 },
      { type: 'str', value: 'foo', desc: 'bar' },
      {
        type: 'add',
        items: [
          { type: 'num', value: 61, desc: 'buzz' },
          { type: 'num', value: 62, desc: 'baz' },
        ],
      },
    ]

    beforeEach(() => {
      store = new Store()
      computation = new FormatComputation(store, {
        type: 'format',
        format: testFormat,
        values: testValues,
      })
    })

    it('interpolates values in the correct order', () => {
      expect(computation.evaluate()).toEqual('42 123 foo')
    })

    it('interpolates descriptions', () => {
      expect(computation.desc).toEqual('`{42} {buzz + baz} {bar}`')
    })

    it('doesn\'t format if value doesn\'t exist', () => {
      computation = new FormatComputation(store, { type: 'format', format: testFormat, values: [] })
      expect(computation.evaluate()).toBe(testFormat)
      expect(computation.desc).toBe(`\`${testFormat}\``)
    })
  })

  describe('with path templates', () => {
    let store: IStore
    let computation: FormatComputation

    const testFormat = '{$foo|oof} {$bar.buzz}'

    beforeEach(() => {
      store = new Store({
        foo: 42,
        bar: {
          buzz: 123,
        },
      })
      computation = new FormatComputation(store, {
        type: 'format',
        format: testFormat,
        values: [],
      })
    })

    it('interpolates values in the correct order', () => {
      expect(computation.evaluate()).toEqual('42 123')
    })

    it('is described using paths', () => {
      expect(computation.desc).toEqual(`\`${testFormat}\``)
    })

    it('uses fallback if path doesn\'t exist', () => {
      store.set('foo', undefined as unknown as DataType)
      expect(computation.evaluate()).toEqual('oof 123')
    })

    it('doesn\'t format if path doesn\'t exist and there is no fallback', () => {
      store.set('bar', { baz: 123 })
      expect(computation.evaluate()).toEqual('42 {$bar.buzz}')
    })
  })
})
