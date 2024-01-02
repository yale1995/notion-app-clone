import { ReactNode } from 'react'
import { Navbar } from './_components/navbar'

interface MarketingLayoutProps {
  children: ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="h-full dark:bg-[#1f1f1f]">
      <Navbar />
      <main className="h-full md:pt-40">{children}</main>
    </div>
  )
}
