import NoteDetails from '@/app/notes/[id]/NoteDetails.client'

export default function ModalNotePage({ params }: { params: { id: string } }) {
  return (
    <div className="modal">
      <NoteDetails id={params.id} />
    </div>
  )
}
