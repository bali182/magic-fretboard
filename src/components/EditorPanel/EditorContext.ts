import { createContext } from 'react'

export type EditorContextType = {
  isSectionOpen(sectionId: string): boolean
  setSectionOpen(sectionId: string, open: boolean): void
}

export const EditorContext = createContext<EditorContextType>(null)
