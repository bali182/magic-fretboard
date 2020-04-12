export enum MarkerKind {
  Default = 'Default',
  Pimary = 'Primary',
  Secondary = 'Secondary',
  Muted = 'Muted',
}

export type MarkerModel = {
  type: 'marker'
  id: string
  label: string
  fret: number
  stringId: string
  kind: MarkerKind
}

export type StringModel = {
  type: 'string'
  id: string
  label?: string
  thickness: number
}

export type FretboardModel = {
  type: 'fretboard'
  strings: StringModel[]
  markers: MarkerModel[]
  firstVisibleFret: number
  lastVisibleFret: number
  fretWidth: number
  fretWireWidth: number
  nutWidth: number
  stringSpacing: number
  stringOverhang: number
  markerRadius: number
}
