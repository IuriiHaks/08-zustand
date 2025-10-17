// 'use client'

// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import css from './NoteForm.module.css'
// import type { CreateNoteRequest, NoteTag } from '@/types/note'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { createNote } from '@/lib/api'

// interface NoteFormProps {
//   onSubmit?: (payload: CreateNoteRequest) => void
//   onSuccess: () => void
//   onCancel: () => void
// }

// const tagOptions: NoteTag[] = [
//   'Todo',
//   'Work',
//   'Personal',
//   'Meeting',
//   'Shopping',
// ]

// const schema = Yup.object({
//   title: Yup.string().min(3).max(50).required('Required'),
//   content: Yup.string().max(500),
//   tag: Yup.mixed<NoteTag>().oneOf(tagOptions).required('Required'),
// })

// export default function NoteForm({
//   onSubmit,
//   onSuccess,
//   onCancel,
// }: NoteFormProps) {
//   const queryClient = useQueryClient()
//   const mutation = useMutation({
//     mutationFn: (values: CreateNoteRequest) => createNote(values),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['notes'] })
//       onSuccess()
//     },
//   })

//   return (
//     <Formik<CreateNoteRequest>
//       initialValues={{ title: '', content: '', tag: 'Todo' }}
//       validationSchema={schema}
//       onSubmit={(values, { resetForm }) => {
//         if (onSubmit) {
//           onSubmit(values)
//         } else {
//           mutation.mutate(values)
//         }
//         resetForm()
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form className={css.form}>
//           <div className={css.formGroup}>
//             <label htmlFor="title">Title</label>
//             <Field id="title" name="title" className={css.input} />
//             <ErrorMessage name="title" component="span" className={css.error} />
//           </div>

//           <div className={css.formGroup}>
//             <label htmlFor="content">Content</label>
//             <Field
//               as="textarea"
//               id="content"
//               name="content"
//               rows={8}
//               className={css.textarea}
//             />
//             <ErrorMessage
//               name="content"
//               component="span"
//               className={css.error}
//             />
//           </div>

//           <div className={css.formGroup}>
//             <label htmlFor="tag">Tag</label>
//             <Field as="select" id="tag" name="tag" className={css.select}>
//               {tagOptions.map((t) => (
//                 <option key={t} value={t}>
//                   {t}
//                 </option>
//               ))}
//             </Field>
//             <ErrorMessage name="tag" component="span" className={css.error} />
//           </div>

//           <div className={css.actions}>
//             <button
//               type="button"
//               className={css.cancelButton}
//               onClick={onCancel}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className={css.submitButton}
//               disabled={isSubmitting}
//             >
//               Create note
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import css from './NoteForm.module.css'
import type { CreateNoteRequest, NoteTag } from '@/types/note'
import { createNote } from '@/lib/api'
import { useRouter } from 'next/navigation'
import useNoteStore from '@/lib/store/noteStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const tagOptions: NoteTag[] = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
]
export default function NoteForm() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { draft, setDraft, clearDraft } = useNoteStore()

  // Мутація створення нотатки
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      clearDraft()
      router.back()
    },
  })

  // Локальний стан форми (ініціалізується з draft)
  const [formData, setFormData] = useState<CreateNoteRequest>(draft)

  // Якщо draft зберігся у Zustand (або localStorage), підставляємо його
  useEffect(() => {
    setFormData(draft)
  }, [draft])

  // Зміна полів і оновлення Zustand
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    const updated = { ...formData, [name]: value }
    setFormData(updated)
    setDraft(updated)
  }

  // Сабміт форми
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  // Відміна створення (draft залишається)
  const handleCancel = () => {
    router.back()
  }

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className={css.input}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={formData.content}
          onChange={handleChange}
          className={css.textarea}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className={css.select}
        >
          {tagOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating...' : ' Create note'}
        </button>
      </div>
    </form>
  )
}
