'use client'

import { useMutation, useQuery } from 'convex/react'
import { useParams, useRouter } from 'next/navigation'
import { api } from '../../../../convex/_generated/api'
import { useState, MouseEvent as ReactMouseEvent } from 'react'
import { toast } from 'sonner'
import { Id } from '../../../../convex/_generated/dataModel'
import { Spinner } from '@/components/spinner'
import { Search, Trash, Undo } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ConfirmModal } from '@/components/modals/confirm-modal'

export const TrashBox = () => {
  const router = useRouter()
  const params = useParams()

  const documents = useQuery(api.documents.getTrash)
  const restore = useMutation(api.documents.restore)
  const remove = useMutation(api.documents.remove)

  const [search, setSearch] = useState('')

  const filteredDocuments = documents?.filter((document) =>
    document.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  )

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`)
  }

  const onRestore = (
    event: ReactMouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<'documents'>,
  ) => {
    event.stopPropagation()

    const promise = restore({ id: documentId })

    toast.promise(promise, {
      loading: 'Restoring note...',
      success: 'Note restored',
      error: 'Failed to restore note',
    })
  }

  const onRemove = (documentId: Id<'documents'>) => {
    const promise = remove({ id: documentId })

    toast.promise(promise, {
      loading: 'Removing note...',
      success: 'Note removed',
      error: 'Failed to remove note',
    })

    if (params.documentId === documentId) {
      router.push('/documents')
    }
  }

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="w-4 h-4" />

        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title"
        />
      </div>

      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>

        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span>{document.title}</span>

            <div className="flex items-center">
              <div
                onClick={(event) => onRestore(event, document._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>

              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}