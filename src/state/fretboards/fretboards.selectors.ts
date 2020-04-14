import { MagicFretboardAppState } from '../state'

export const getFretboardById = (fretboardId: string) => (state: MagicFretboardAppState) => {
  return state.fretboards.find((fretboard) => fretboard.id === fretboardId) || null
}
