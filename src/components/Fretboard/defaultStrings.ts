import { StringModel, Note } from './FretboardModel'
import { nanoid } from 'nanoid'

const sixStringGuitarNotes: [string, Note][] = [
  ['E6', Note.E],
  ['A', Note.A],
  ['D', Note.D],
  ['G', Note.G],
  ['B', Note.B],
  ['E1', Note.E],
]

export const sixGuitarStrings = sixStringGuitarNotes.map(
  ([label, note]): StringModel => ({
    label,
    note,
    id: nanoid(),
    thickness: 6,
    type: 'string',
  })
)

const fourStringBassNotes: [string, Note][] = [
  ['E', Note.E],
  ['A', Note.A],
  ['D', Note.D],
  ['G', Note.G],
]

export const fourBassStrings = fourStringBassNotes.map(
  ([label, note]): StringModel => ({
    label,
    note,
    id: nanoid(),
    thickness: 8,
    type: 'string',
  })
)
