'use client'

import NoteForm from '@/components/NoteForm/NoteForm'
import { useRouter } from 'next/navigation'

export default function NoteFormClient() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/notes')
  }

  const handleCancel = () => {
    router.back()
  }

  return <NoteForm onSuccess={handleSuccess} onCancel={handleCancel} />
}
