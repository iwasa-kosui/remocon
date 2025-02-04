import { z } from 'zod'

const symbol = Symbol('AirconTemp')
const schema = z.string().brand(symbol)

export type AirconTemp = z.infer<typeof schema>
export const AirconTemp = {
  schema,
  new: schema.safeParse,
  unsafeNew: schema.parse,
} as const
