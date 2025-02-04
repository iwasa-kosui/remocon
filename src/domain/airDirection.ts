import { z } from 'zod'

const symbol = Symbol('AirDirection')
const schema = z.string().brand(symbol)

export type AirDirection = z.infer<typeof schema>
export const AirDirection = {
  schema,
  new: schema.safeParse,
  unsafeNew: schema.parse,
} as const
