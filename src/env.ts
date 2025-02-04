'use server'
import { z } from 'zod'

const schema = z.object({
  API_KEY: z.string(),
})

export const Env = schema.parse(process.env)
