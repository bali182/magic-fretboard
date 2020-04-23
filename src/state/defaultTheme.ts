import { FretboardTheme } from '../components/Fretboard/FretboardModel'

export const defaultTheme: FretboardTheme = {
  stringOverhang: 20,
  stringSpacing: 40,
  nutWidth: 15,
  fretWidth: 80,
  fretWireWidth: 8,
  markerRadius: 20,
  markerToNutSpace: 10,

  stringColor: '#6c6c6c',
  nutColor: '#6c6c6c',
  fretWireColor: '#999999',

  markerFontSize: 22,
  markerFontFamily: 'sans-serif',

  defaultMarkerColor: '#27a9e1',
  defaultMarkerFontColor: '#fff',

  primaryMarkerColor: '#D66853',
  primaryMarkerFontColor: '#fff',

  hollowMarkerStrokeWidth: 8,
  hollowMarkerFontSize: 20,

  mutedMarkerStrokeWidth: 8,
}
