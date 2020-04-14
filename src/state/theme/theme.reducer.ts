import { ThemeState } from '../state'
import { ThemeAction, ThemeActionType } from './theme.actionTypes'
import { defaultTheme } from '../defaultTheme'

export function themeReducer(state: ThemeState = defaultTheme, action: ThemeAction): ThemeState {
  switch (action.type) {
    case ThemeActionType.UPDATE_THEME:
      return action.payload.theme
    default:
      return state
  }
}
