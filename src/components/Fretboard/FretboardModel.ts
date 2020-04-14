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
  strings: StringModel[]
  markers: MarkerModel[]
  firstVisibleFret: number
  lastVisibleFret: number
}
