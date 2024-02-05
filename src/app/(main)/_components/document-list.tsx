'use client'
import { useParams, useRouter } from 'next/navigation'
import { Doc, Id } from '../../../../convex/_generated/dataModel'
import { api } from '../../../../convex/_generated/api'
import { Fragment, useState } from 'react'
import { useQuery } from 'convex/react'
import { Item } from './item'
import { cn } from '@/lib/utils'
import { FileIcon } from 'lucide-react'

interface DocumentListProps {
  parentDocumentId?: Id<'documents'>
  level?: number
  data?: Doc<'documents'>[]
}

export const DocumentList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const params = useParams()
  const router = useRouter()

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  })

  const onExpand = (documentId: string) => {
    setExpanded((state) => ({ ...state, [documentId]: !state[documentId] }))
  }

  const onRedirect = (documentId: string) => {
    router.push(`documents/${documentId}`)
  }

  if (!documents) {
    return (
      <Fragment>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <Fragment>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </Fragment>
        )}
      </Fragment>
    )
  }

  return (
    <Fragment>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          'hidden text-sm font-medium text-muted-foreground/80',
          expanded && 'last:block',
          level === 0 && 'hidden',
        )}
      >
        No pages inside
      </p>

      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
          />

          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </Fragment>
  )
}
