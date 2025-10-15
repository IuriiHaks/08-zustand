import css from './CreateNote.module.css'
import NoteFormClient from './NoteFormClient'

export const metadata = {
  title: 'NoteHub — Create Note',
  description: 'Create a new note on NoteHub',
  openGraph: {
    title: 'NoteHub — Create Note',
    description: 'Create a new note on NoteHub',
    url: 'https://08-zustand-iota-two.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
      },
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
