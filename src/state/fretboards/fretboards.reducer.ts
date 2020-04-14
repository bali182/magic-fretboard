import { FretboardsState } from '../state'
import { FretboardAction, FretboardActionType } from './fretboards.actionTypes'

export function fretboardsReducer(state: FretboardsState = [], action: FretboardAction): FretboardsState {
  switch (action.type) {
    case FretboardActionType.ADD_FRETBOARD:
      return state.concat([action.payload.fretboard])
    case FretboardActionType.DELETE_FRETBOARD:
      return state.filter((fretboard) => fretboard.id !== action.payload.id)
    case FretboardActionType.UPDATE_FRETBOARD:
      const { fretboard: updatedFretboard } = action.payload
      return state.map((fretboard) => (fretboard.id === updatedFretboard.id ? updatedFretboard : fretboard))
    default:
      return state
  }
}
