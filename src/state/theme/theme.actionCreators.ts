import { UpdateThemeAction, UpdateThemePayload, ThemeActionType } from './theme.actionTypes'

export function updateTheme(payload: UpdateThemePayload): UpdateThemeAction {
  return {
    type: ThemeActionType.UPDATE_THEME,
    payload,
  }
}
