import { Note, FretboardModel, MarkerModel, StringModel } from './components/Fretboard/FretboardModel'

export const ChromaticScaleFromC = [
  Note.C,
  Note.CSharp,
  Note.D,
  Note.DSharp,
  Note.E,
  Note.F,
  Note.FSharp,
  Note.G,
  Note.GSharp,
  Note.A,
  Note.ASharp,
  Note.B,
]

export function getChromaticScale(root: Note): Note[] {
  const index = ChromaticScaleFromC.indexOf(root)
  const end = ChromaticScaleFromC.slice(0, index)
  const start = ChromaticScaleFromC.slice(index)
  return start.concat(end)
}

export function moveNote(note: Note, semitones: number): Note {
  const scale = getChromaticScale(note)
  const withoutOctaves = semitones % scale.length
  const moveBy = withoutOctaves >= 0 ? withoutOctaves : scale.length + withoutOctaves
  const chromaticFromNote = getChromaticScale(note)
  return chromaticFromNote[moveBy]
}

function getNoteByStringAndFretInternal(string: StringModel, fret: number): Note {
  return moveNote(string.note, fret)
}

export function getNoteByStringAndFret(fretboard: FretboardModel, stringId: string, fret: number): string {
  return getNoteByStringAndFretInternal(
    fretboard.strings.find((string) => string.id === stringId),
    fret
  )
}

export function getNoteByMarker(fretboard: FretboardModel, marker: MarkerModel): Note {
  return getNoteByStringAndFretInternal(
    fretboard.strings.find((string) => string.id === marker.stringId),
    marker.fret
  )
}

export function updateNoteLabel(fretboard: FretboardModel, oldMarker: MarkerModel, newMarker: MarkerModel): string {
  const note = getNoteByMarker(fretboard, oldMarker)
  if (newMarker.label !== note) {
    return newMarker.label
  }
  return getNoteByMarker(fretboard, newMarker)
}

export function updateNoteLabels(
  markers: MarkerModel[],
  oldString: StringModel,
  newString: StringModel
): MarkerModel[] {
  if (oldString.note === newString.note) {
    return markers
  }
  return markers.map((marker) => {
    if (marker.stringId === newString.id && getNoteByStringAndFretInternal(oldString, marker.fret) === marker.label) {
      return {
        ...marker,
        label: getNoteByStringAndFretInternal(newString, marker.fret),
      }
    }
    return marker
  })
}
