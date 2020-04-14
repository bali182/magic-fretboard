import { MarkerTheme, MarkerShape, FretboardTheme } from '../components/Fretboard/FretboardModel'

const defaultFontSize = 22
const defautlFontFamily = 'sans-serif'

const primaryMarkerTheme: MarkerTheme = {
  shape: MarkerShape.Circle,
  fillColor: '#D66853',
  strokeColor: 'none',
  fontColor: '#fff',
  fontSize: defaultFontSize,
  fontFamily: defautlFontFamily,
  strokeWidth: 0,
}

const defaultMarkerTheme: MarkerTheme = {
  shape: MarkerShape.Circle,
  fillColor: '#27a9e1',
  strokeColor: 'none',
  fontColor: '#fff',
  fontSize: defaultFontSize,
  fontFamily: defautlFontFamily,
  strokeWidth: 0,
}

const mutedMarkerTheme: MarkerTheme = {
  shape: MarkerShape.X,
  fillColor: 'none',
  strokeColor: '#27a9e1',
  fontColor: '#fff',
  fontSize: defaultFontSize,
  fontFamily: defautlFontFamily,
  strokeWidth: 10,
}

const hollowMarkerTheme: MarkerTheme = {
  shape: MarkerShape.Circle,
  fillColor: 'none',
  strokeColor: '#27a9e1',
  fontColor: '#555',
  fontSize: defaultFontSize,
  fontFamily: defautlFontFamily,
  strokeWidth: 10,
}

export const defaultTheme: FretboardTheme = {
  stringOverhang: 20,
  stringSpacing: 40,
  nutWidth: 15,
  fretWidth: 80,
  fretWireWidth: 8,
  markerRadius: 20,
  markerToNutSpace: 10,
  hollowMarkerOutlineWidth: 8,

  stringColor: '#6c6c6c',
  nutColor: '#6c6c6c',
  fretWireColor: '#999999',

  defaultMarkerTheme,
  mutedMarkerTheme,
  primaryMarkerTheme,
  hollowMarkerTheme,
}
