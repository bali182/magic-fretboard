import {
  AddFreboardPayload,
  AddFreboardAction,
  FretboardActionType,
  DeleteFreboardPayload,
  DeleteFreboardAction,
  UpdateFretboardPayload,
  UpdateFreboardAction,
} from './fretboards.actionTypes'

export function addFretboard(payload: AddFreboardPayload): AddFreboardAction {
  return {
    type: FretboardActionType.ADD_FRETBOARD,
    payload,
  }
}

export function deleteFretboard(payload: DeleteFreboardPayload): DeleteFreboardAction {
  return {
    type: FretboardActionType.DELETE_FRETBOARD,
    payload,
  }
}

export function updateFretboard(payload: UpdateFretboardPayload): UpdateFreboardAction {
  return {
    type: FretboardActionType.UPDATE_FRETBOARD,
    payload,
  }
}
