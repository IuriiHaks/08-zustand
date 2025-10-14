import { dehydrate, QueryClient } from '@tanstack/react-query'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'
import NotesClient from './Notes.client'
// import { fetchNotes } from '@/lib/api'
import { fetchNotesByFilter } from '@/lib/api'
import { Metadata } from 'next'
// import NotesList from '@/components/NoteList/NoteList'

interface NotePageProps {
  params: Promise<{ slug?: string[] }>
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const filter = resolvedParams.slug?.join('/') || 'All'
  return {
    title: `NoteHub — Filter: ${filter}`,
    description: `Перегляд нотаток за фільтром: ${filter}.`,
    openGraph: {
      title: `NoteHub — Filter: ${filter}`,
      description: `Перегляд нотаток за фільтром: ${filter}.`,
      url: `https://08-zustand-iota-two.vercel.app/notes/filter/${filter}`,
      images: [
        { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' },
      ],
    },
  }
}

export default async function NotesFilterPage({ params }: NotePageProps) {
  const { slug } = await params
  const tag = slug?.[0] ?? 'All'
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, 1],
    queryFn: () => fetchNotesByFilter(tag),
  })

  return (
    <TanStackProvider dehydratedState={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </TanStackProvider>
  )
}
