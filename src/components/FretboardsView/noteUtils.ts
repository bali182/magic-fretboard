import { Note } from '../Fretboard/FretboardModel'

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
