import {
  SetSelectionPayload,
  SetSelectionAction,
  SelectionActionType,
  UnsetSelectionPayload,
  UnsetSelectionAction,
} from './selection.actionTypes'

export function setSelection(payload: SetSelectionPayload): SetSelectionAction {
  return {
    type: SelectionActionType.SET_SELECTION,
    payload,
  }
}

export function unsetSelection(payload: UnsetSelectionPayload): UnsetSelectionAction {
  return {
    type: SelectionActionType.UNSET_SELECTION,
    payload,
  }
}
