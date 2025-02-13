import { z } from 'zod'
import { AirconSettings } from '../airconSettings'
import { ApplianceId } from './applianceId'
import { AirconMode } from '../airconMode'
import { AirconTemp } from '../airconTemp'
import { AirVolume } from '../airVolume'
import { AirDirection } from '../airDirection'

const schema = z.object({
  id: ApplianceId.schema,
  type: z.literal('AC'),
  settings: AirconSettings.schema,
  aircon: z.object({
    range: z.object({
      modes: z.record(
        AirconMode.schema,
        z.object({
          temp: z.array(AirconTemp.schema),
          vol: z.array(AirVolume.schema),
          dir: z.array(AirDirection.schema),
        })
      ),
    }),
  }),
})

export type AirconAppliance = z.infer<typeof schema>
export const AirconAppliance = {
  schema,
  new: schema.safeParse,
  unsafeNew: schema.parse,
} as const
