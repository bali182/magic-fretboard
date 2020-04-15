export type MarkerSelection = {
  type: 'markerSelection'
  markerId: string
  freboardId: string
}

export type StringSelection = {
  type: 'stringSelection'
  stringId: string
  freboardId: string
}

export type FretSelection = {
  type: 'fretSelection'
  fret: number
  freboardId: string
}

export type FretboardSelection = {
  type: 'fretboardSelection'
  freboardId: string
}

export type SelectionModel = MarkerSelection | StringSelection | FretSelection | FretboardSelection
