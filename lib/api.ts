import axios from 'axios'
import type { Note, CreateNoteRequest } from '../types/note'

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
})

export interface NotesResponse {
  notes: Note[]
  totalPages: number
}

export async function fetchNotes(
  search = '',
  page = 1,
  perPage = 10,
  tag?: string
): Promise<NotesResponse> {
  const params: Record<string, string | number> = { page, perPage }
  if (search && search.trim()) params.search = search

  const { data } = await api.get<NotesResponse>('/notes', { params })

  let notes = data.notes

  if (tag && tag !== 'All') {
    notes = notes.filter(
      (note) => note.tag?.toLowerCase() === tag.toLowerCase()
    )
  }

  return { ...data, notes }
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`)
  return data
}

export async function createNote(payload: CreateNoteRequest): Promise<Note> {
  const { data } = await api.post<Note>('/notes', payload)
  return data
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`)
  return data
}
