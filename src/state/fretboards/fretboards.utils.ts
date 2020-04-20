import { FretboardModel, FretboardOrientation } from '../../components/Fretboard/FretboardModel'
import { nanoid } from 'nanoid'
import { sixGuitarStrings } from '../../components/Fretboard/defaultStrings'

export function createDefaultFretboard(): FretboardModel {
  return {
    type: 'fretboard',
    id: nanoid(),
    firstVisibleFret: 0,
    lastVisibleFret: 5,
    markers: [],
    orientation: FretboardOrientation.RightHanded,
    strings: sixGuitarStrings,
  }
}
