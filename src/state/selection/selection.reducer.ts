import omit from 'lodash/omit'
import { SelectionState } from '../state'
import { SelectionAction, SelectionActionType } from './selection.actionTypes'
import { FretboardAction, FretboardActionType } from '../fretboards/fretboards.actionTypes'

export function selectionReducer(
  state: SelectionState = {},
  action: SelectionAction | FretboardAction
): SelectionState {
  switch (action.type) {
    case SelectionActionType.SET_SELECTION:
      return { ...state, [action.payload.fretboardId]: action.payload.selection }
    case FretboardActionType.DELETE_FRETBOARD:
      return omit(state, [action.payload.id])
    default:
      return state
  }
}
