import { z } from 'zod'
import { Aircon } from './aircon'
import { AirconSettings } from './airconSettings'
import { ApplianceId } from './applianceId'

const schema = z.object({
  id: ApplianceId.schema,
  type: z.enum(['AC']),
  settings: AirconSettings.schema,
  aircon: Aircon.schema,
})

export type AirconAppliance = z.infer<typeof schema>
export const AirconAppliance = {
  schema,
  new: schema.safeParse,
  unsafeNew: schema.parse,
} as const
