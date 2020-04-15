import { SelectionState } from '../state'
import { SelectionAction, SelectionActionType } from './selection.actionTypes'

export function selectionReducer(state: SelectionState = null, action: SelectionAction): SelectionState {
  switch (action.type) {
    case SelectionActionType.SET_SELECTION:
      return action.payload.selection
    default:
      return state
  }
}
