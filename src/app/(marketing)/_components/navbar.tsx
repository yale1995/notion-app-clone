'use client'

import Link from 'next/link'

import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { useConvexAuth } from 'convex/react'
import { SignInButton, UserButton } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { Fragment } from 'react'
import { Spinner } from '@/components/spinner'

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const scrolled = useScrollTop()

  return (
    <div
      className={cn(
        'z-50 bg-background/40 backdrop-blur-sm dark:bg-[#1f1f1f]/40 fixed top-0 flex items-center w-full p-6',
        scrolled && 'border-b shadow-sm',
      )}
    >
      <Logo />

      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <Fragment>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </SignInButton>

            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Get Jotion Free
              </Button>
            </SignInButton>
          </Fragment>
        )}
        {isAuthenticated && !isLoading && (
          <Fragment>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Jotion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </Fragment>
        )}

        <ThemeToggle />
      </div>
    </div>
  )
}
