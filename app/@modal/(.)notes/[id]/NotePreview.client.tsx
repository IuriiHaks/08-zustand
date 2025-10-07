// 'use client'

// import { useQuery } from '@tanstack/react-query'
// import { fetchNoteById } from '@/lib/api'
// import Modal from '@/components/Modal/Modal'
// import { useRouter } from 'next/navigation'
// import type { Note } from '@/types/note'
// import css from './NotePreview.module.css'

// interface Props {
//   id: string
// }

// export default function NotePreviewClient({ id }: Props) {
//   const router = useRouter()
//   const { data, isLoading, error } = useQuery({
//     queryKey: ['note', id],
//     queryFn: () => fetchNoteById(id),
//     refetchOnMount: false,
//   })

//   if (isLoading) return null
//   if (error || !data) return null

//   const handleClose = () => router.back()

//   return (
//     <Modal onClose={handleClose}>
//       <div className={css.container}>
//         <div className={css.item}>
//           <div className={css.header}>
//             <h2>{(data as Note).title}</h2>
//           </div>
//           <p className={css.content}>{(data as Note).content}</p>
//           <p className={css.date}>
//             {new Date((data as Note).createdAt).toLocaleString()}
//           </p>
//         </div>
//       </div>
//     </Modal>
//   )
// }
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

  // коректне відображення детальної інформації
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
