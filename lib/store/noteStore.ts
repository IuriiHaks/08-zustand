import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DraftNote } from '@/types/note'

interface NoteStore {
  draft: DraftNote
  setDraft: (note: Partial<DraftNote>) => void
  clearDraft: () => void
}

const initialDraft: DraftNote = {
  title: '',
  content: '',
  tag: 'Todo',
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({ draft: { ...state.draft, ...note } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage',
      partialize: (state) => ({ draft: state.draft }),
    }
  )
)
