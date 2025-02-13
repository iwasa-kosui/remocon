import { z } from 'zod'
import { AirconAppliance } from './aircon'
import { UnknownAppliance } from './unknown'

const appliance = AirconAppliance.schema.or(UnknownAppliance.schema)
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
