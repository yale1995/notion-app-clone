import { z } from 'zod'

const envSchema = z.object({
  CONVEX_DEPLOYMENT: z.string(),
  CLERK_SECRET_KEY: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables',
    parsedEnv.error.flatten().fieldErrors,
  )

  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data
