import { StringModel } from './FretboardModel'
import { nanoid } from 'nanoid'

export const sixGuitarStrings = ['E6', 'A', 'D', 'G', 'B', 'E1'].map(
  (string): StringModel => ({
    id: nanoid(),
    thickness: 6,
    type: 'string',
    label: string,
  })
)

export const fourBassStrings = ['E', 'A', 'D', 'G'].map(
  (string): StringModel => ({
    id: nanoid(),
    thickness: 8,
    type: 'string',
    label: string,
  })
)
