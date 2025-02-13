import { z } from 'zod'
import { ApplianceId } from './applianceId'

const schema = z.record(z.string(), z.unknown())

export type UnknownAppliance = z.infer<typeof schema> & {
  type: unknown
}

export const UnknownAppliance = {
  schema,
  unsafeNew: schema.parse,
} as const
