import { SelectionPayload, SelectionAction, SelectionActionType } from './selection.actionTypes'

export function setSelection(payload: SelectionPayload): SelectionAction {
  return {
    type: SelectionActionType.SET_SELECTION,
    payload,
  }
}
