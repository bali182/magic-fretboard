import { MarkerModel, MarkerKind, FretboardModel, FretboardOrientation } from './FretboardModel'
import { nanoid } from 'nanoid'
import { sixGuitarStrings } from './defaultStrings'

const zeroMarker: MarkerModel = {
  type: 'marker',
  id: nanoid(),
  fret: 0,
  stringId: sixGuitarStrings[4].id,
  kind: MarkerKind.Hollow,
  label: '',
}

const firstMarker: MarkerModel = {
  type: 'marker',
  id: nanoid(),
  fret: 3,
  stringId: sixGuitarStrings[3].id,
  kind: MarkerKind.Pimary,
  label: '#3',
}

const secondMarker: MarkerModel = {
  type: 'marker',
  id: nanoid(),
  fret: 1,
  stringId: sixGuitarStrings[0].id,
  kind: MarkerKind.Default,
  label: '1',
}

const thirdMarker: MarkerModel = {
  type: 'marker',
  id: nanoid(),
  fret: 2,
  stringId: sixGuitarStrings[5].id,
  kind: MarkerKind.Muted,
  label: '',
}

const markers = [zeroMarker, firstMarker, secondMarker, thirdMarker]

export const sampleModel: FretboardModel = {
  type: 'fretboard',
  orientation: FretboardOrientation.RightHanded,
  id: nanoid(),
  strings: sixGuitarStrings,
  markers,
  firstVisibleFret: 0,
  lastVisibleFret: 5,
}
