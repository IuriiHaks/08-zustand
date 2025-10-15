export type NoteTag = 'Work' | 'Personal' | 'Todo' | 'Meeting' | 'Shopping'

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  tag: NoteTag
}

export interface CreateNoteRequest {
  title: string
  content: string
  tag: NoteTag
}

export interface UpdateNoteRequest {
  title?: string
  content?: string
  tag?: NoteTag
}

export interface NoteDraft {
  title: string
  content: string
  tag: NoteTag
}
