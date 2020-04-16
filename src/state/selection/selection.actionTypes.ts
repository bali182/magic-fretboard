import { SelectionModel } from '../../components/Fretboard/FretboardModel'

export enum SelectionActionType {
  SET_SELECTION = 'SET_SELECTION',
  UNSET_SELECTION = 'UNSET_SELECTION',
}

export type SetSelectionPayload = {
  fretboardId: string
  selection: SelectionModel
}

export type SetSelectionAction = {
  type: SelectionActionType.SET_SELECTION
  payload: SetSelectionPayload
}

export type UnsetSelectionPayload = {
  fretboardId: string
}

export type UnsetSelectionAction = {
  type: SelectionActionType.UNSET_SELECTION
  payload: UnsetSelectionPayload
}

export type SelectionAction = SetSelectionAction | UnsetSelectionAction
