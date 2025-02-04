import { z } from 'zod'

const symbol = Symbol('AirVolume')
const schema = z.string().brand(symbol)

export type AirVolume = z.infer<typeof schema>
export const AirVolume = {
  schema,
  new: schema.safeParse,
  unsafeNew: schema.parse,
} as const
