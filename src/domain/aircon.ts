import { z } from 'zod'
import { AirVolume } from './airVolume'
import { AirconMode } from './airconMode'
import { AirconTemp } from './airconTemp'
import { AirDirection } from './airDirection'

const tempRange = z.array(AirconTemp.schema)
const dirRange = z.array(AirDirection.schema)
const volRange = z.array(AirVolume.schema)
const modeRange = z.object({
  temp: tempRange,
  dir: dirRange,
  vol: volRange,
})

const range = z.object({
  modes: z.record(AirconMode.schema, modeRange),
})

const schema = z.object({
  range,
})

export const Aircon = {
  schema,
  new: schema.parse,
  unsafeNew: schema.parse,
} as const
