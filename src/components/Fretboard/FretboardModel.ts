export enum MarkerKind {
  Default = 'Default',
  Pimary = 'Primary',
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
  muted: boolean
  kind: MarkerKind
}

export type StringModel = {
  type: 'string'
  id: string
  label?: string
  note: Note
  thickness: number
}

export type StringThicknessModel = UniformStringThicknessModel | InterpolatedStringThicknessModel

export type UniformStringThicknessModel = {
  type: 'UniformStringThicknessModel'
  thickness: number
}

export type InterpolatedStringThicknessModel = {
  type: 'InterpolatedStringThicknessModel'
  topStringThickness: number
  bottomStringThickness: number
}

export type FretboardTheme = {
  // Dimensions
  fretWidth: number
  fretWireWidth: number
  nutWidth: number
  stringSpacing: number
  stringOverhang: number
  markerRadius: number
  markerToNutSpace: number

  // String thickness
  stringThickness: StringThicknessModel

  // Colors
  nutColor: string
  fretWireColor: string
  stringColor: string

  // Dots
  showDots: boolean
  dotColor: string
  dotRadius: number

  // Markers
  markerFontSize: number
  markerFontFamily: string
  defaultMarkerColor: string
  defaultMarkerFontColor: string
  primaryMarkerColor: string
  primaryMarkerFontColor: string
  hollowMarkerStrokeWidth: number
  mutedMarkerStrokeWidth: number
  // Fret label
  showFretLabel: boolean
  fretLabelColor: string
  fretLabelFontFamily: string
  fretLabelFontSize: number
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
