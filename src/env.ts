import { z } from 'zod'

const server = z.object({
  CONVEX_DEPLOYMENT: z.string(),
  CLERK_SECRET_KEY: z.string(),
})

const client = z.object({
  NEXT_PUBLIC_CONVEX_URL: z.string().url(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
})

const processEnv = {
  CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
}

const merged = server.merge(client)

const isServer = typeof window === 'undefined'

const parsedEnv = isServer
  ? merged.safeParse(processEnv) // --> on serve it is possible to validate all variables
  : client.safeParse(processEnv) // --> on client only variables exposed to the browser

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables',
    parsedEnv.error.flatten().fieldErrors,
  )

  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data
