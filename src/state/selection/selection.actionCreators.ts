import { SetSelectionPayload, SetSelectionAction, SelectionActionType } from './selection.actionTypes'

export function setSelection(payload: SetSelectionPayload): SetSelectionAction {
  return {
    type: SelectionActionType.SET_SELECTION,
    payload,
  }
}
