'use client'

import Link from 'next/link'

import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { useConvexAuth } from 'convex/react'
import { ArrowRight } from 'lucide-react'
import { SignInButton } from '@clerk/clerk-react'

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents & Plans. Unified. Welcome to{' '}
        <span className="underline">Jotion</span>
      </h1>

      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connected workspace where <br />
        better, faster, work happens.
      </h3>

      {isLoading && (
        <div className="flex items-center justify-center">
          {' '}
          <Spinner />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Entrer Jotion
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}

      {!isLoading && !isAuthenticated && (
        <SignInButton mode="modal" afterSignInUrl="/documents">
          <Button>
            Get Jotion Free <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  )
}
