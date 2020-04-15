import { SelectionModel } from './SelectionModel'

export enum SelectionActionType {
  SET_SELECTION = 'SET_SELECTION',
}

export type SelectionPayload = {
  selection: SelectionModel
}

export type SelectionAction = {
  type: SelectionActionType.SET_SELECTION
  payload: SelectionPayload
}
