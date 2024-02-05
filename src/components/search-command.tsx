'use client'

import { useEffect, useState } from 'react'
import { File } from 'lucide-react'
import { useQuery } from 'convex/react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'
import { api } from '../../convex/_generated/api'
import { useSearch } from '@/hooks/use-search'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'

export const SearchCommand = () => {
  const [isMounted, setIsMounted] = useState(false)

  const { user } = useUser()

  const router = useRouter()
  const documents = useQuery(api.documents.getSearch)

  const toggle = useSearch((store) => store.toggle)
  const isOpen = useSearch((store) => store.isOpen)
  const onClose = useSearch((store) => store.onClose)

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggle()
      }
    }

    document.addEventListener('keydown', down)

    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`)
    onClose()
  }

  if (!isMounted) {
    return null
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s Jotion`} />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {documents?.map((document) => (
            <CommandItem
              title={document.title}
              key={document._id}
              value={`${document._id}-${document.title}`}
              onSelect={onSelect}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
