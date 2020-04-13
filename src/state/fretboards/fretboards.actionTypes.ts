import { FretboardModel } from '../../components/Fretboard/FretboardModel'

export enum FretboardActionType {
  ADD_FRETBOARD = 'ADD_FRETBOARD',
  DELETE_FRETBOARD = 'DELETE_FRETBOARD',
  UPDATE_FRETBOARD = 'UPDATE_FRETBOARD',
}

export type AddFreboardPayload = {
  fretboard: FretboardModel
}

export type AddFreboardAction = {
  type: FretboardActionType.ADD_FRETBOARD
  payload: AddFreboardPayload
}

export type DeleteFreboardPayload = {
  id: string
}

export type DeleteFreboardAction = {
  type: FretboardActionType.DELETE_FRETBOARD
  payload: DeleteFreboardPayload
}

export type UpdateFretboardPayload = {
  fretboard: FretboardModel
}

export type UpdateFreboardAction = {
  type: FretboardActionType.UPDATE_FRETBOARD
  payload: UpdateFretboardPayload
}

export type FretboardAction = AddFreboardAction | UpdateFreboardAction | DeleteFreboardAction
