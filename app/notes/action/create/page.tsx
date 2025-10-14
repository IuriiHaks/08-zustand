import css from './CreateNote.module.css'
import { Metadata } from 'next'
import NoteFormClient from './NoteFormClient'

export const metadata: Metadata = {
  title: 'Create note — NoteHub',
  description: 'Створіть нову нотатку в застосунку NoteHub.',
  openGraph: {
    title: 'Create note — NoteHub',
    description: 'Створіть нову нотатку в застосунку NoteHub.',
    url: 'https://08-zustand-iota-two.vercel.app/notes/action/create',
    images: [
      { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' },
    ],
  },
}

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteFormClient />
      </div>
    </main>
  )
}
