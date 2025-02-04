'use server'

import { RemoClient } from '../client/remo'
import type { AirconSettings } from '../domain/airconSettings'
import type { ApplianceId } from '../domain/applianceId'
import { Env } from '../env'

export async function updateAirconSetting(
  id: ApplianceId,
  settings: AirconSettings
) {
  const client = RemoClient.from(Env.API_KEY)
  try {
    await client.updateAirconSettings(id, settings)
  } catch (error) {
    console.error(error)
  }
}
