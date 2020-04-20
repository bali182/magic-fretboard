export enum MarkerKind {
  Default = 'Default',
  Pimary = 'Primary',
  Muted = 'Muted',
  Hollow = 'Hollow',
}

export enum MarkerShape {
  Circle = 'Circle',
  X = 'X',
}

export enum FretboardOrientation {
  LeftHanded = 'LeftHanded',
  RightHanded = 'RightHanded',
}

export enum Note {
  A = 'A',
  ASharp = 'A#',
  B = 'B',
  C = 'C',
  CSharp = 'C#',
  D = 'D',
  DSharp = 'D#',
  E = 'E',
  F = 'F',
  FSharp = 'F#',
  G = 'G',
  GSharp = 'G#',
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
  note: Note
  thickness: number
}

export type MarkerTheme = {
  fillColor: string
  strokeColor: string
  strokeWidth: number
  fontColor: string
  fontSize: number
  fontFamily: string
  shape: MarkerShape
}

export type FretboardTheme = {
  // Dimensions
  fretWidth: number
  fretWireWidth: number
  nutWidth: number
  stringSpacing: number
  stringOverhang: number
  markerRadius: number
  hollowMarkerOutlineWidth: number
  markerToNutSpace: number
  // Colors
  nutColor: string
  fretWireColor: string
  stringColor: string
  // Marker styles
  defaultMarkerTheme: MarkerTheme
  primaryMarkerTheme: MarkerTheme
  mutedMarkerTheme: MarkerTheme
  hollowMarkerTheme: MarkerTheme
}

export type FretboardModel = {
  type: 'fretboard'
  id: string
  orientation: FretboardOrientation
  strings: StringModel[]
  markers: MarkerModel[]
  firstVisibleFret: number
  lastVisibleFret: number
}

export type MarkerSelection = {
  type: 'markerSelection'
  markerId: string
}

export type StringSelection = {
  type: 'stringSelection'
  stringId: string
}

export type FretSelection = {
  type: 'fretSelection'
  fret: number
}

export type FretboardSelection = {
  type: 'fretboardSelection'
}

export type ThemeSelection = {
  type: 'themeSelection'
}

export type SelectionModel = MarkerSelection | StringSelection | FretSelection | FretboardSelection | ThemeSelection
