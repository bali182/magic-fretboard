import isNil from 'lodash/isNil'
import { SelectionModel, MarkerSelection, StringSelection, FretboardSelection, ThemeSelection } from './FretboardModel'

export function isMarkerSelection(selection: SelectionModel): selection is MarkerSelection {
  return !isNil(selection) && selection.type === 'markerSelection'
}

export function isStringSelection(selection: SelectionModel): selection is StringSelection {
  return !isNil(selection) && selection.type === 'stringSelection'
}

export function isFretboardSelection(selection: SelectionModel): selection is FretboardSelection {
  return !isNil(selection) && selection.type === 'fretboardSelection'
}

export function isThemeSelection(selection: SelectionModel): selection is ThemeSelection {
  return !isNil(selection) && selection.type === 'themeSelection'
}
