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
  markerFontSize: 20,
  markerFontFamily: 'sans-serif',
  defaultMarkerColor: '#27a9e1',
  defaultMarkerFontColor: '#fff',
  primaryMarkerColor: '#D66853',
  primaryMarkerFontColor: '#fff',
  hollowMarkerStrokeWidth: 8,
  mutedMarkerStrokeWidth: 8,
  showDots: true,
  dotColor: '#6c6c6c',
  dotRadius: 6,
  showFretLabel: true,
  fretLabelColor: '#333',
  fretLabelFontFamily: 'sans-serif',
  fretLabelFontSize: 20,
  stringThickness: {
    type: 'InterpolatedStringThicknessModel',
    topStringThickness: 7,
    bottomStringThickness: 3,
  },
}
