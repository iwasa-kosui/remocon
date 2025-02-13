import { z } from 'zod'

const applianceId = z.string().brand('ApplianceId')
export type ApplianceId = z.infer<typeof applianceId>
export const ApplianceId = {
  schema: applianceId,
  unsafeNew: applianceId.parse,
} as const
