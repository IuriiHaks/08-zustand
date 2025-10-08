'use client'

import Link from 'next/link'
import css from './NoteList.module.css'
import type { Note } from '@/types/note'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNote } from '@/lib/api'

interface NoteListProps {
  notes: Note[]
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient()

  const deleteNoteMutation = useMutation({
    mutationFn: (noteid: string) => deleteNote(noteid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] }) // Оновлення списку нотаток
    },
  })

  const handleDelete = (noteid: string) => {
    deleteNoteMutation.mutate(noteid)
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
