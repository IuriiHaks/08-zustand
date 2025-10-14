'use client'

// import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react'
// import * as Yup from 'yup'
import css from './NoteForm.module.css'
import type { CreateNoteRequest, NoteTag } from '@/types/note'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/lib/api'
import { useNoteStore } from '@/lib/store/noteStore'

interface NoteFormProps {
  onSubmit?: (payload: CreateNoteRequest) => void
  onSuccess: () => void
  onCancel: () => void
}

const tagOptions: NoteTag[] = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
]

// const schema = Yup.object({
//   title: Yup.string().min(3).max(50).required('Required'),
//   content: Yup.string().max(500),
//   tag: Yup.mixed<NoteTag>().oneOf(tagOptions).required('Required'),
// })

export default function NoteForm({
  // onSubmit,
  onSuccess,
  onCancel,
}: NoteFormProps) {
  const queryClient = useQueryClient()
  const { draft, setDraft, clearDraft } = useNoteStore()

  const [formData, setFormData] = useState<CreateNoteRequest>({
    title: draft.title,
    content: draft.content,
    tag: draft.tag as NoteTag,
  })
  const mutation = useMutation({
    mutationFn: (values: CreateNoteRequest) => createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      clearDraft()
      onSuccess()
    },
  })

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
  //         <form className={css.form}>
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
  //         </form>
  //       )}
  //     </Formik>
  //   )
  // }
  // Add handleChange and handleSubmit functions
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setDraft({ ...draft, [name]: value })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={css.input}
          required
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
        <button type="button" className={css.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  )
}
