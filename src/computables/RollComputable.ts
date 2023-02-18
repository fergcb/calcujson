import type BaseComputable from './BaseComputable'

export default interface RollComputable extends BaseComputable {
  type: 'roll'
  dice: string
}
