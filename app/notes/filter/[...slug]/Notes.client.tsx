'use client'

import { useState } from 'react'
import {
  useQuery,
  useQueryClient,
  useMutation,
  keepPreviousData,
} from '@tanstack/react-query'
import { fetchNotes, createNote } from '@/lib/api'
import NoteList from '@/components/NoteList/NoteList'
import SearchBox from '@/components/SearchBox/SearchBox'
import Pagination from '@/components/Pagination/Pagination'
import NoteForm from '@/components/NoteForm/NoteForm'
import Modal from '@/components/Modal/Modal'
import { useDebouncedCallback } from 'use-debounce'
import type { CreateNoteRequest } from '@/types/note'
import css from './Notes.client.module.css'
import Link from 'next/link'

interface Props {
  initialTag?: string
}
export default function NotesClient({ initialTag = 'All' }: Props) {
  const [searchInput, setSearchInput] = useState('')
  const [tag] = useState<string | undefined>(
    initialTag === 'All' ? undefined : initialTag
  )
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const queryClient = useQueryClient()

  const debouncedSetQuery = useDebouncedCallback(() => {
    setPage(1)
  }, 500)

  const handleSearch = (value: string) => {
    setSearchInput(value)
    debouncedSetQuery()
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', tag ?? 'All', page, searchInput],
    queryFn: () => fetchNotes(searchInput, page, 10, tag),
    placeholderData: keepPreviousData,
  })

  const createMutation = useMutation({
    mutationFn: (payload: CreateNoteRequest) => createNote(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  })

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchInput} onSearch={handleSearch} />
        <Link
          href="notes/action/create"
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </Link>
      </header>

      {isLoading && <p className={css.loading}>Loading, please wait...</p>}
      {error && (
        <p>Could not fetch the list of notes. {(error as Error).message}</p>
      )}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSuccess={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            onSubmit={(values) => createMutation.mutate(values)}
          />
        </Modal>
      )}
    </div>
  )
}
