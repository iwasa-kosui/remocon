import { z } from 'zod'
import { ApplianceId } from './applianceId'

const schema = z.object({
  id: ApplianceId.schema,
  type: z.string(),
})

export const UnknownAppliance = {
  schema,
  unsafeNew: schema.parse,
} as const
