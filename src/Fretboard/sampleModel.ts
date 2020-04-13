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

const zeroMarker: MarkerModel = {
  type: 'marker',
  id: nanoid(),
  fret: 0,
  stringId: strings[4].id,
  kind: MarkerKind.Hollow,
  label: '',
}

const firstMarker: MarkerModel = {
  type: 'marker',
  id: nanoid(),
  fret: 3,
  stringId: strings[3].id,
  kind: MarkerKind.Pimary,
  label: '#3',
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
  kind: MarkerKind.Muted,
  label: '',
}

const markers = [zeroMarker, firstMarker, secondMarker, thirdMarker]

export const sampleModel: FretboardModel = {
  type: 'fretboard',
  strings,
  markers,
  firstVisibleFret: 0,
  lastVisibleFret: 5,
}
