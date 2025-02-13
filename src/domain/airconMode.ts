import { z } from 'zod'
import { assertsNever } from '../assertsNever'

const schema = z.enum(['cool', 'warm', 'dry', 'blow', 'auto'])
export type AirconMode = z.infer<typeof schema>
export const AirconMode = {
  schema,
  new: schema.safeParse,
  unsafeNew: schema.parse,
  display: (mode: AirconMode) => {
    switch (mode) {
      case 'cool':
        return '冷房'
      case 'warm':
        return '暖房'
      case 'dry':
        return '除湿'
      case 'blow':
        return '送風'
      case 'auto':
        return '自動'
      default:
        return assertsNever(mode)
    }
  },
  Cool: schema.Values.cool,
  Warm: schema.Values.warm,
  Dry: schema.Values.dry,
  Auto: schema.Values.auto,
}
