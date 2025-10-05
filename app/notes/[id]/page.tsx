import { dehydrate, QueryClient } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'
import NotePreviewClient from '@/components/NotePreview/NotePreview.client'

interface Props {
  params: Promise<{ id: string }>
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  })

  return (
    <TanStackProvider dehydratedState={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </TanStackProvider>
  )
}
