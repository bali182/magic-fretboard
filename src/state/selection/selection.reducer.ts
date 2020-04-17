import { SelectionState } from '../state'
import { SelectionAction, SelectionActionType } from './selection.actionTypes'
import { FretboardAction, FretboardActionType } from '../fretboards/fretboards.actionTypes'

export function selectionReducer(
  state: SelectionState = { fretboardId: null, selection: null },
  action: SelectionAction | FretboardAction
): SelectionState {
  switch (action.type) {
    case SelectionActionType.SET_SELECTION:
      const { payload } = action
      return { fretboardId: payload.fretboardId, selection: payload.selection }
    case FretboardActionType.DELETE_FRETBOARD:
      if (action.payload.id === state.fretboardId) {
        return { fretboardId: null, selection: null }
      }
      return state
    default:
      return state
  }
}
