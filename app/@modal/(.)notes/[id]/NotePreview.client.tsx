'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Modal from '@/components/Modal/Modal'
import { fetchNoteById } from '@/lib/api'
import type { Note } from '@/types/note'
import css from './NotePreview.module.css' // опціонально, якщо маєш стилі

interface Props {
  id: string
}

export default function NotePreview({ id }: Props) {
  const router = useRouter()

  const { data, isLoading, isError, error } = useQuery<Note, Error>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  })

  const handleClose = () => {
    router.back()
  }

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.container ?? ''}>
          <p>Loading, please wait...</p>
        </div>
      </Modal>
    )
  }

  if (isError) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.container ?? ''}>
          <p>Could not load note. {error?.message ?? ''}</p>
        </div>
      </Modal>
    )
  }

  if (!data) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.container ?? ''}>
          <p>Note not found.</p>
        </div>
      </Modal>
    )
  }

  const created = new Date(data.createdAt).toLocaleString()

  return (
    <Modal onClose={handleClose}>
      <div className={css.container ?? ''}>
        <div className={css.item ?? ''}>
          <div className={css.header ?? ''}>
            <h2>{data.title}</h2>
          </div>

          <p className={css.content ?? ''}>{data.content}</p>

          {data.tag && <p className={css.tag ?? ''}>Tag: {data.tag}</p>}

          <p className={css.date ?? ''}>Created: {created}</p>

          <div style={{ marginTop: 12 }}>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
