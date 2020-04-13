import { StringModel, MarkerModel, MarkerKind, FretboardModel, FretboardTheme } from './FretboardModel'
import { nanoid } from 'nanoid'

const strings = ['E6', 'A', 'D', 'G', 'B', 'E1'].map(
  (string): StringModel => ({
    id: nanoid(),
    thickness: 6,
    type: 'string',
    label: string,
  })
)

const zeroMarker: MarkerModel = {
  type: 'marker',
  id: nanoid(),
  fret: 0,
  stringId: strings[4].id,
  kind: MarkerKind.Secondary,
  label: '0',
}

const firstMarker: MarkerModel = {
  type: 'marker',
  id: nanoid(),
  fret: 3,
  stringId: strings[3].id,
  kind: MarkerKind.Pimary,
  label: '3',
}

const secondMarker: MarkerModel = {
  type: 'marker',
  id: nanoid(),
  fret: 1,
  stringId: strings[0].id,
  kind: MarkerKind.Default,
  label: '1',
}

const thirdMarker: MarkerModel = {
  type: 'marker',
  id: nanoid(),
  fret: 2,
  stringId: strings[5].id,
  kind: MarkerKind.Secondary,
  label: '2',
}

const markers = [zeroMarker, firstMarker, secondMarker, thirdMarker]

export const defaultTheme: FretboardTheme = {
  stringOverhang: 20,
  stringSpacing: 40,
  nutWidth: 15,
  fretWidth: 80,
  fretWireWidth: 8,
  markerRadius: 30,
  markerToNutSpace: 10,
  hollowMarkerOutlineWidth: 8,

  stringColor: '#6c6c6c',
  nutColor: '#6c6c6c',
  fretWireColor: '#999999',
  defaultMarkerColor: '#27a9e1',
  primaryMarkerColor: '#D66853',
  mutedMarkerColor: '#999999',
  secondaryMarkerColor: 'rgba(39, 169, 225, 0.5)',
}

export const defaultModel: FretboardModel = {
  type: 'fretboard',
  strings,
  markers,
  firstVisibleFret: 0,
  lastVisibleFret: 5,
}
