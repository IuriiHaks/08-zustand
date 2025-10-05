'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import Modal from '@/components/Modal/Modal'
import { useRouter } from 'next/navigation'
import type { Note } from '@/types/note'
import css from './NotePreview.module.css'

interface Props {
  id: string
}

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter()
  const { data, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  })

  if (isLoading) return null
  if (error || !data) return null

  const handleClose = () => router.back()

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{(data as Note).title}</h2>
          </div>
          <p className={css.content}>{(data as Note).content}</p>
          <p className={css.date}>
            {new Date((data as Note).createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </Modal>
  )
}
