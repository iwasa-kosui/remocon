import { z } from 'zod'
import { AirVolume } from './airVolume'
import { AirDirection } from './airDirection'
import { AirconMode } from './airconMode'
import { AirconTemp } from './airconTemp'

const schema = z.object({
  vol: AirVolume.schema,
  dir: AirDirection.schema,
  mode: AirconMode.schema,
  temp: AirconTemp.schema,
})

export type AirconSettings = z.infer<typeof schema>
export const AirconSettings = {
  schema,
  new: schema.safeParse,
  unsafeNew: schema.parse,
} as const
