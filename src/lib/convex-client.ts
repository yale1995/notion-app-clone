'use client'

import { ConvexReactClient } from 'convex/react'
import { envClient } from '@/env-client'

export const convex = new ConvexReactClient(envClient.NEXT_PUBLIC_CONVEX_URL)
