import { dehydrate, QueryClient } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'
import NotePreviewClient from '@/app/@modal/(.)notes/[id]/NotePreview.client'

interface ParamsPromise {
  params: Promise<{ id: string }>
}

export default async function NoteDetailsPage({ params }: ParamsPromise) {
  const { id } = await params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  })

  const dehydrateState = dehydrate(queryClient)

  return (
    <TanStackProvider dehydratedState={dehydrateState}>
      <NotePreviewClient id={id} />
    </TanStackProvider>
  )
}
