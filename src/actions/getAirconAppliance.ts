'use server'

import { useCache } from '@lazarv/react-server/memory-cache'
import { RemoClient } from '../client/remo'
import { Env } from '../env'

export async function getAirconAppliance() {
  const client = RemoClient.from(Env.API_KEY)
  return await useCache(
    ['AirconAppliance'],
    async () => {
      return client.getAirconAppliance()
    },
    1000
  )
}
