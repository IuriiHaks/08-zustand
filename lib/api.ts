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
  const params: Record<string, string | number> = {
    search,
    page,
    perPage,
  }
  if (search.trim()) params.search = search

  if (tag && tag !== 'All') params.tag = tag

  const { data } = await api.get<NotesResponse>('/notes', { params })

  // console.log('Fetched notes:', data)
  return data
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
