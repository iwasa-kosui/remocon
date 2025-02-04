'use server'
import { Appliances } from '../domain/appliance'
import type { AirconSettings } from '../domain/airconSettings'
import type { ApplianceId } from '../domain/applianceId'
import { AirconAppliance } from '../domain/airconAppliance'

const Host = 'https://api.nature.global/1'

export type RemoClient = {
  getAirconAppliance: () => Promise<AirconAppliance>
  updateAirconSettings: (
    id: ApplianceId,
    setting: AirconSettings
  ) => Promise<void>
}

export const RemoClient = {
  from: (apiKey: string): RemoClient => {
    const headers = {
      Authorization: `Bearer ${apiKey}`,
    } as const

    const getAirconAppliance = async () => {
      const res = await fetch(`${Host}/appliances`, { headers })
      const json = await res.json()
      const apps = Appliances.unsafeNew(json)
      const ac = apps.find((app) => app.type === 'AC')
      if (!ac) {
        throw new Error('AC not found')
      }
      return AirconAppliance.unsafeNew(ac)
    }

    const updateAirconSettings = async (
      id: ApplianceId,
      { vol, dir, mode, temp }: AirconSettings
    ) => {
      const formData = new FormData()
      formData.append('air_volume', vol)
      formData.append('air_direction', dir)
      formData.append('operation_mode', mode)
      formData.append('temperature', temp)
      await fetch(`${Host}/appliances/${id}/aircon_settings`, {
        method: 'POST',
        headers: {
          ...headers,
        },
        body: formData,
      })
    }

    return {
      getAirconAppliance,
      updateAirconSettings,
    } as const
  },
} as const
