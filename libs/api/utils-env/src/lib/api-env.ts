import * as process from 'node:process'
import { z } from 'zod'

const apiEnvSchema = z.object({
  isProd: z.boolean(),
  api: z.object({
    port: z.number()
  }),
  db: z.object({
    url: z.string().url()
  }),
  /*auth: z.object({
    jwtVerifyKey: z.string()
  })*/
})

export type TApiEnv = z.infer<typeof apiEnvSchema>

const getEnv = process.env['BOOKING_ENV'] === 'build' ? (env: TApiEnv) => env : apiEnvSchema.parse

export const apiEnv = getEnv({
  isProd: process.env['BOOKING_ENV'] === 'production',
  api: {
    port: Number(process.env['BOOKING_API_PORT'])
  },
  db: {
    url: process.env['DATABASE_URL']
  },
  /*auth: {
    jwtVerifyKey: process.env['CLERK_JWT_VERIFICATION_KEY']
  }*/
})