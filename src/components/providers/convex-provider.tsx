'use client'

import { ClerkProvider, useAuth } from '@clerk/clerk-react'
import { convex } from '@/lib/convex-client'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ReactNode } from 'react'
import { envClient } from '@/env-client'

interface ConvexProviderProps {
  children: ReactNode
}

export const ConvexProvider = ({ children }: ConvexProviderProps) => {
  return (
    <ClerkProvider publishableKey={envClient.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
