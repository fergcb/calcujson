import RollComputation from 'computations/RollComputation'
import Store from '@/Store'

describe('RollComputation', () => {
  describe.each([
    'd20',
    '1d20',
    '4d6dL',
    '2d8 + 5',
  ])('%s', dice => {
    let store: Store
    let computation: RollComputation

    beforeEach(() => {
      store = new Store()
      computation = new RollComputation(store, {
        type: 'roll',
        dice,
      })
    })

    it('is described correctly', () => {
      expect(computation.desc).toBe(dice)
    })
  })
})
