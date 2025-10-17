'use client'

import { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'
import NoteList from '@/components/NoteList/NoteList'
import SearchBox from '@/components/SearchBox/SearchBox'
import Pagination from '@/components/Pagination/Pagination'
import { useDebounce } from 'use-debounce'
import css from './Notes.client.module.css'
import Link from 'next/link'

interface Props {
  tag?: string
}
export default function NotesClient({ tag }: Props) {
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)

  const [debouncedSearch] = useDebounce(searchInput, 500)

  const handleSearch = (value: string) => {
    setSearchInput(value)
    setPage(1)
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', tag ?? 'All', page, debouncedSearch],
    queryFn: () => fetchNotes(debouncedSearch, page, 10, tag),
    placeholderData: keepPreviousData,
  })

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchInput} onSearch={handleSearch} />
        <Link href="/notes/action/create" className={css.button}>
          Create note
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
    </div>
  )
}
