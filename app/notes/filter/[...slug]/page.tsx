import { dehydrate, QueryClient } from '@tanstack/react-query'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'
import NotesClient from './Notes.client'
import { fetchNotes } from '@/lib/api'

interface NotePageProps {
  params: Promise<{ slug?: string[] }>
}

export default async function NotesFilterPage({ params }: NotePageProps) {
  const { slug } = await params
  const tag = slug?.[0] ?? 'All'
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, 1],
    queryFn: () => fetchNotes('', 1, 10, tag === 'All' ? undefined : tag),
  })

  return (
    <TanStackProvider dehydratedState={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </TanStackProvider>
  )
}
