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
  fretId: string
  stringId: string
  radius: number
  kind: MarkerKind
}

export type StringModel = {
  type: 'string'
  id: string
  label?: string
  thickness: number
}
export type FretModel = {
  type: 'fret'
  id: string
  label?: string
  width: number
  thickness: number
}

export type FretboardModel = {
  type: 'fretboard'
  strings: StringModel[]
  frets: FretModel[]
  markers: MarkerModel[]
  hasNut: boolean
  stringSpacing: number
  stringOverhang: number
}
