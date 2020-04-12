import { FretModel, StringModel, MarkerModel, MarkerKind, FretboardModel } from './FretboardModel'
import range from 'lodash/range'
import { nanoid } from 'nanoid'

const frets = range(1, 6).map(
  (index): FretModel => ({
    id: nanoid(),
    type: 'fret',
    width: 80,
    thickness: 8,
    label: index.toString(),
  })
)

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
  fretId: frets[3].id,
  stringId: strings[3].id,
  kind: MarkerKind.Pimary,
  label: '1',
  radius: 20,
}

const secondMarker: MarkerModel = {
  type: 'marker',
  id: nanoid(),
  fretId: frets[2].id,
  stringId: strings[0].id,
  kind: MarkerKind.Default,
  label: '2',
  radius: 20,
}

const thirdMarker: MarkerModel = {
  type: 'marker',
  id: nanoid(),
  fretId: frets[5].id,
  stringId: strings[5].id,
  kind: MarkerKind.Secondary,
  label: '3',
  radius: 20,
}

const markers = [firstMarker, secondMarker, thirdMarker]

export const model: FretboardModel = {
  type: 'fretboard',
  frets,
  strings,
  markers,
  hasNut: true,
  stringOverhang: 20,
  stringSpacing: 40,
}
