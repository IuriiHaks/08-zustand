import { dehydrate, QueryClient } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'
import NotePreviewClient from '@/app/@modal/(.)notes/[id]/NotePreview.client'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const note = await fetchNoteById(id)
  const title = note.title
  const description = note.content.slice(0, 160)
  const url = `https://08-zustand-iota-two.vercel.app/notes/${id}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
  }
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
