import { FretboardTheme } from '../../components/Fretboard/FretboardModel'

export enum ThemeActionType {
  UPDATE_THEME = 'UPDATE_THEME',
}

export type UpdateThemePayload = {
  theme: FretboardTheme
}

export type UpdateThemeAction = {
  type: ThemeActionType.UPDATE_THEME
  payload: UpdateThemePayload
}

export type ThemeAction = UpdateThemeAction
