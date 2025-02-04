import { z } from 'zod'
import { AirconAppliance } from './airconAppliance'
import { UnknownAppliance } from './unknownAppliance'

const appliance = z.union([AirconAppliance.schema, UnknownAppliance.schema])
export type Appliance = z.infer<typeof appliance>
export const Appliance = {
  schema: appliance,
  new: appliance.safeParse,
  unsafeNew: appliance.parse,
} as const

const appliances = z.array(appliance)
export type Appliances = z.infer<typeof appliances>
export const Appliances = {
  schema: appliances,
  new: appliances.safeParse,
  unsafeNew: appliances.parse,
} as const
