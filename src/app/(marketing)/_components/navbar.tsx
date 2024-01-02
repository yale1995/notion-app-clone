'use client'

import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { ThemeToggle } from '@/components/theme-toggle'

export const Navbar = () => {
  const scrolled = useScrollTop()

  return (
    <div
      className={cn(
        'z-50 bg-background/40 backdrop-blur-sm dark:bg-[#1f1f1f]/40 fixed top-0 flex items-center w-full p-6',
        scrolled && 'border-b shadow-sm',
      )}
    >
      <Logo />

      <div className="md:ml-auto md:justify-end justify-between w-full flex itemce gap-x-2">
        <ThemeToggle />
      </div>
    </div>
  )
}
