import { StringModel, MarkerModel, MarkerKind, FretboardModel } from './FretboardModel'
import { nanoid } from 'nanoid'

const strings = ['E6', 'A', 'D', 'G', 'B', 'E1'].map(
  (string): StringModel => ({
    id: nanoid(),
    thickness: 6,
    type: 'string',
    label: string,
  })
)

const firstMarker: MarkerModel = {
  type: 'marker',
  id: nanoid(),
  fret: 3,
  stringId: strings[3].id,
  kind: MarkerKind.Pimary,
  label: '1',
}

const secondMarker: MarkerModel = {
  type: 'marker',
  id: nanoid(),
  fret: 1,
  stringId: strings[0].id,
  kind: MarkerKind.Default,
  label: '2',
}

const thirdMarker: MarkerModel = {
  type: 'marker',
  id: nanoid(),
  fret: 2,
  stringId: strings[5].id,
  kind: MarkerKind.Secondary,
  label: '3',
}

const markers = [firstMarker, secondMarker, thirdMarker]

export const model: FretboardModel = {
  type: 'fretboard',
  strings,
  markers,
  stringOverhang: 20,
  stringSpacing: 40,
  nutWidth: 10,
  firstVisibleFret: 0,
  lastVisibleFret: 5,
  fretWidth: 100,
  fretWireWidth: 8,
  markerRadius: 20,
}
