'use client'

import { Id } from '../../../../convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
// import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useUser } from '@clerk/clerk-react'

import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ItemProps {
  id?: Id<'documents'>
  documentIcon?: string
  active?: boolean
  expanded?: boolean
  isSearch?: boolean
  level?: number
  onExpand?: () => void
  label: string
  icon: LucideIcon
  onClick?: () => void
}

export const Item = ({
  id,
  icon: Icon,
  label,
  onClick,
  active,
  documentIcon,
  expanded,
  isSearch,
  level = 0,
  onExpand,
}: ItemProps) => {
  const { user } = useUser()
  // const router = useRouter()

  const ChevronIcon = expanded ? ChevronDown : ChevronRight
  const create = useMutation(api.documents.create)
  const archive = useMutation(api.documents.archive)

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault()
    event.stopPropagation()

    onExpand?.()
  }

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    event.preventDefault()

    if (!id) return

    const promise = archive({ id })

    toast.promise(promise, {
      loading: 'Moving to trash...',
      success: 'Note moved to trash!',
      error: 'Failed to archive note.',
    })
  }

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    event.preventDefault()

    if (!id) return

    const promise = create({ title: 'Untitled', parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.()
          console.log(documentId)
          // router.push(`documents/${documentId}`)
        }
      },
    )

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created!',
      error: 'Failed to create new note.',
    })
  }

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : '12px' }}
      className={cn(
        'group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium',
        active && 'bg-primary/5 text-primary',
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>
      )}

      {documentIcon ? (
        <div>{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-sm">⌘</span>K
        </kbd>
      )}

      {!!id && (
        <div
          role="button"
          onClick={onCreate}
          className="ml-auto flex items-center gap-x-2"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:bg-neutral-600"
              >
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem onClick={onArchive}>
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <div className="text-xs text-muted-foreground p-2">
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div
            role="button"
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:bg-neutral-600"
          >
            <Plus className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : '12px' }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  )
}
